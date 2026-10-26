import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validateStoryboard } from '../skills/company-profile-showcase/scripts/validate-storyboard.mjs';

const exampleURL = new URL('../skills/company-profile-showcase/assets/storyboard.example.json', import.meta.url);
const helper = fileURLToPath(new URL('../skills/company-profile-showcase/scripts/validate-storyboard.mjs', import.meta.url));
const example = JSON.parse(await readFile(exampleURL, 'utf8'));
const fresh = () => structuredClone(example);

test('storyboard derives contiguous frame boundaries and the exact target duration', () => {
  const timeline = validateStoryboard(fresh());
  assert.equal(timeline.total_frames, 600);
  assert.equal(timeline.duration_seconds, 20);
  assert.equal(timeline.scenes[0].start_frame, 0);
  for (let index = 1; index < timeline.scenes.length; index += 1) {
    assert.equal(timeline.scenes[index].start_frame, timeline.scenes[index - 1].end_frame_exclusive);
  }
  assert.equal(timeline.scenes.at(-1).end_frame_exclusive, timeline.total_frames);
  assert.deepEqual(timeline.warnings, []);
});

test('all master formats derive their intended dimensions', () => {
  for (const [format, dimensions] of Object.entries({ landscape: [1920, 1080], vertical: [1080, 1920], square: [1080, 1080] })) {
    const plan = fresh();
    plan.format = format;
    const timeline = validateStoryboard(plan);
    assert.deepEqual([timeline.width, timeline.height], dimensions);
  }
});

test('fractional-second scenes align without accumulating floating-point duration errors', () => {
  const plan = fresh();
  plan.duration_seconds = 0.3;
  plan.scenes = [0.1, 0.2].map((duration, index) => ({
    id: `scene-${index}`, duration_seconds: duration, visual: 'Actual UI', copy: '', settled_seconds: 0,
  }));
  assert.equal(validateStoryboard(plan).total_frames, 9);
});

test('invalid durations, frame alignment, and mismatched totals fail', () => {
  for (const duration of [0, -1, Infinity, NaN, '3', 0.05, 1e-12]) {
    const plan = fresh();
    plan.scenes[0].duration_seconds = duration;
    assert.throws(() => validateStoryboard(plan));
  }
  const mismatch = fresh();
  mismatch.duration_seconds = 21;
  assert.throws(() => validateStoryboard(mismatch), /expected 630/);
});

test('invalid schema, settings, and duplicate scene identities fail', () => {
  for (const plan of [null, [], {}, { ...fresh(), schema_version: 2 },
    { ...fresh(), format: ['landscape'] }, { ...fresh(), format: 'unknown' },
    { ...fresh(), fps: 29.97 }, { ...fresh(), fps: 0 }, { ...fresh(), fps: 121 },
    { ...fresh(), audio_mode: 'voiceover' }, { ...fresh(), scenes: [] }]) {
    assert.throws(() => validateStoryboard(plan));
  }
  const duplicate = fresh();
  duplicate.scenes[1].id = duplicate.scenes[0].id;
  assert.throws(() => validateStoryboard(duplicate), /Duplicate scene id/);
});

test('short readable holds warn while impossible holds fail', () => {
  const plan = fresh();
  plan.scenes[0].copy = 'Five words needing more time';
  plan.scenes[0].settled_seconds = 0.5;
  const timeline = validateStoryboard(plan);
  assert.equal(timeline.warnings.length, 1);
  assert.match(timeline.warnings[0], /brand-hook/);
  plan.scenes[0].settled_seconds = 4;
  assert.throws(() => validateStoryboard(plan), /must fit inside/);
  plan.scenes[0].settled_seconds = 0;
  assert.throws(() => validateStoryboard(plan), /positive settled hold/);
});

test('storyboard CLI reads a file, emits JSON, and reports missing input with a failure exit', () => {
  const result = spawnSync(process.execPath, [helper, fileURLToPath(exampleURL)], { encoding: 'utf8' });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).total_frames, 600);
  const missing = spawnSync(process.execPath, [helper], { encoding: 'utf8' });
  assert.equal(missing.status, 1);
  assert.match(missing.stdout, /Usage:/);
});
