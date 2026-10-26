import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../bin/comp-ile.js', import.meta.url));
const source = fileURLToPath(new URL('../skills/company-profile-website/', import.meta.url));
const analyticsSource = fileURLToPath(new URL('../skills/website-analytics/', import.meta.url));
const inquiriesSource = fileURLToPath(new URL('../skills/website-inquiries/', import.meta.url));
const showcaseSource = fileURLToPath(new URL('../skills/company-profile-showcase/', import.meta.url));
const shared = '.agents/skills/company-profile-website';
const claude = '.claude/skills/company-profile-website';

async function workspace(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'comp-ile-test-'));
  t.after(async () => {
    const resolved = path.resolve(root);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.ok(path.basename(resolved).startsWith('comp-ile-test-'));
    await rm(resolved, { recursive: true, force: true });
  });
  return root;
}

function run(cwd, ...args) {
  const result = spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
  assert.ifError(result.error);
  return result;
}

async function verifyCopy(destination, original = source) {
  const entries = await readdir(original, { withFileTypes: true });
  for (const entry of entries) {
    const originalPath = path.join(original, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) await verifyCopy(destinationPath, originalPath);
    else assert.deepEqual(await readFile(destinationPath), await readFile(originalPath));
  }
}

test('help and version work without installing anything', async (t) => {
  const root = await workspace(t);
  for (const args of [[], ['--help'], ['init', '--help']]) {
    const result = run(root, ...args);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /comp-ile init/);
  }
  const result = run(root, '--version');
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), '0.2.0');
  assert.deepEqual(await readdir(root), []);
});

test('bare init installs complete packages for all providers in cwd', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init');
  assert.equal(result.status, 0, result.stderr);
  await verifyCopy(path.join(root, shared));
  await verifyCopy(path.join(root, claude));
  assert.deepEqual(await readdir(path.join(root, '.agents/skills')), ['company-profile-website']);
  assert.deepEqual(await readdir(path.join(root, '.claude/skills')), ['company-profile-website']);
  assert.deepEqual((await readdir(root)).sort(), ['.agents', '.claude']);
});

test('relative target with spaces is created and Claude is selectable', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', 'nested/company website', '--provider', 'claude-code');
  assert.equal(result.status, 0, result.stderr);
  const target = path.join(root, 'nested/company website');
  await verifyCopy(path.join(target, claude));
  assert.deepEqual(await readdir(target), ['.claude']);
});

test('codex and antigravity share one installation with repeated providers', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', '--provider=codex,antigravity', '--provider', 'codex');
  assert.equal(result.status, 0, result.stderr);
  await verifyCopy(path.join(root, shared));
  assert.deepEqual(await readdir(root), ['.agents']);
  assert.equal(result.stdout.split('written').length - 1, 1);
});

test('explicit absolute --dir installs Antigravity without touching cwd', async (t) => {
  const root = await workspace(t);
  const target = path.join(root, 'target');
  const result = run(root, 'init', `--dir=${target}`, '--provider', 'antigravity');
  assert.equal(result.status, 0, result.stderr);
  await verifyCopy(path.join(target, shared));
  assert.deepEqual(await readdir(root), ['target']);
});

test('repeated init is idempotent and preserves unrelated project files', async (t) => {
  const root = await workspace(t);
  await writeFile(path.join(root, 'index.html'), '<h1>Keep me</h1>');
  assert.equal(run(root, 'init').status, 0);
  const installedSkill = path.join(root, shared, 'SKILL.md');
  const before = await stat(installedSkill);
  const result = run(root, 'init');
  assert.equal(result.status, 0, result.stderr);
  assert.equal((await stat(installedSkill)).mtimeMs, before.mtimeMs);
  await verifyCopy(path.join(root, shared));
  await verifyCopy(path.join(root, claude));
  assert.equal(await readFile(path.join(root, 'index.html'), 'utf8'), '<h1>Keep me</h1>');
});

test('conflicts stop all selected providers before writes', async (t) => {
  const root = await workspace(t);
  await mkdir(path.join(root, claude), { recursive: true });
  const existing = path.join(root, claude, 'SKILL.md');
  await writeFile(existing, 'My existing skill');
  const result = run(root, 'init');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--force/);
  assert.equal(await readFile(existing, 'utf8'), 'My existing skill');
  assert.deepEqual(await readdir(root), ['.claude']);
  assert.deepEqual(await readdir(path.join(root, claude)), ['SKILL.md']);
});

test('--force updates packaged files and retains custom files', async (t) => {
  const root = await workspace(t);
  assert.equal(run(root, 'init', '--provider', 'codex').status, 0);
  const target = path.join(root, shared);
  await writeFile(path.join(target, 'SKILL.md'), 'Edited locally');
  await writeFile(path.join(target, 'custom.txt'), 'Keep my notes');
  await writeFile(path.join(target, 'assets/custom.png'), Buffer.from([0, 1, 2, 255]));
  const result = run(root, 'init', '--provider', 'codex', '--force');
  assert.equal(result.status, 0, result.stderr);
  await verifyCopy(target);
  assert.equal(await readFile(path.join(target, 'custom.txt'), 'utf8'), 'Keep my notes');
  assert.deepEqual(await readFile(path.join(target, 'assets/custom.png')), Buffer.from([0, 1, 2, 255]));
});

test('--dry-run does not create the project or update existing files', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', 'not-created', '--dry-run');
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(await readdir(root), []);
  assert.equal(run(root, 'init', '--provider', 'codex').status, 0);
  const existing = path.join(root, shared, 'SKILL.md');
  await writeFile(existing, 'Local draft');
  const update = run(root, 'init', '--provider', 'codex', '--force', '--dry-run');
  assert.equal(update.status, 0, update.stderr);
  assert.equal(await readFile(existing, 'utf8'), 'Local draft');
});

test('invalid options and providers fail without side effects', async (t) => {
  const root = await workspace(t);
  for (const args of [
    ['unknown'], ['init', '--provider', 'unknown'], ['init', '--provider'],
    ['init', '--dir'], ['init', '--provider='], ['init', '--provider=codex,'],
    ['init', '--forceful'], ['init', 'one', '--dir', 'two'],
  ]) {
    const result = run(root, ...args);
    assert.equal(result.status, 1, JSON.stringify(args));
    assert.ok(result.stderr.includes('comp-ile:'), result.stderr);
  }
  assert.deepEqual(await readdir(root), []);
});

test('directory occupying a packaged file is rejected even with force', async (t) => {
  const root = await workspace(t);
  await mkdir(path.join(root, shared, 'SKILL.md'), { recursive: true });
  const result = run(root, 'init', '--force');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not a regular file/);
  assert.deepEqual(await readdir(root), ['.agents']);
});

test('provider directory junctions cannot redirect writes outside the project', async (t) => {
  const root = await workspace(t);
  const project = path.join(root, 'project');
  const outside = path.join(root, 'outside');
  await mkdir(project);
  await mkdir(outside);
  await symlink(outside, path.join(project, '.agents'), process.platform === 'win32' ? 'junction' : 'dir');
  const result = run(project, 'init', '--force');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /symlink\/junction/);
  assert.deepEqual(await readdir(outside), []);
  assert.deepEqual(await readdir(project), ['.agents']);
});

test('file destinations cannot be used as project directories', async (t) => {
  const root = await workspace(t);
  await writeFile(path.join(root, 'project'), 'Keep this file');
  const result = run(root, 'init', 'project');
  assert.equal(result.status, 1);
  assert.equal(await readFile(path.join(root, 'project'), 'utf8'), 'Keep this file');
});

test('analytics can be installed alone with all references and assets', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', '--skill', 'website-analytics');
  assert.equal(result.status, 0, result.stderr);
  for (const provider of ['.agents', '.claude']) {
    const parent = path.join(root, provider, 'skills');
    assert.deepEqual(await readdir(parent), ['website-analytics']);
    await verifyCopy(path.join(parent, 'website-analytics'), analyticsSource);
  }
});

test('inquiries can be installed alone with complete references and assets', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', '--skill', 'website-inquiries');
  assert.equal(result.status, 0, result.stderr);
  for (const provider of ['.agents', '.claude']) {
    const parent = path.join(root, provider, 'skills');
    assert.deepEqual(await readdir(parent), ['website-inquiries']);
    await verifyCopy(path.join(parent, 'website-inquiries'), inquiriesSource);
  }
});

test('all skills are installed for each distinct provider destination', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', '--skill=all');
  assert.equal(result.status, 0, result.stderr);
  for (const provider of ['.agents', '.claude']) {
    await verifyCopy(path.join(root, provider, 'skills/company-profile-website'));
    await verifyCopy(path.join(root, provider, 'skills/website-analytics'), analyticsSource);
    await verifyCopy(path.join(root, provider, 'skills/website-inquiries'), inquiriesSource);
    await verifyCopy(path.join(root, provider, 'skills/company-profile-showcase'), showcaseSource);
  }
  assert.equal(result.stdout.split('written').length - 1, 8);
});

test('comma-separated and repeated skill selections are deduplicated', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', '--provider=codex,antigravity',
    '--skill=website-analytics,company-profile-website', '--skill', 'website-analytics');
  assert.equal(result.status, 0, result.stderr);
  await verifyCopy(path.join(root, shared));
  await verifyCopy(path.join(root, '.agents/skills/website-analytics'), analyticsSource);
  assert.deepEqual(await readdir(root), ['.agents']);
  assert.equal(result.stdout.split('written').length - 1, 2);
});

test('invalid skill selections and traversal fail before writing', async (t) => {
  const root = await workspace(t);
  for (const args of [
    ['--skill'], ['--skill='], ['--skill=unknown'], ['--skill=../website-analytics'],
    ['--skill=all,unknown'], ['--skill=website-analytics,'],
    ['--skill=../website-inquiries'], ['--skill=website-inquiries,'],
    ['--skill=../company-profile-showcase'], ['--skill=company-profile-showcase,'],
  ]) {
    const result = run(root, 'init', ...args);
    assert.equal(result.status, 1, JSON.stringify(args));
    assert.match(result.stderr, /skill/);
  }
  assert.deepEqual(await readdir(root), []);
});

test('analytics conflict prevents writes to every selected skill and provider', async (t) => {
  const root = await workspace(t);
  const parent = path.join(root, '.claude/skills/website-analytics');
  await mkdir(parent, { recursive: true });
  const existing = path.join(parent, 'SKILL.md');
  await writeFile(existing, 'Client customization');
  const result = run(root, 'init', '--skill=all');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--force/);
  assert.deepEqual(await readdir(root), ['.claude']);
  assert.deepEqual(await readdir(path.join(root, '.claude/skills')), ['website-analytics']);
  assert.deepEqual(await readdir(parent), ['SKILL.md']);
  assert.equal(await readFile(existing, 'utf8'), 'Client customization');
  const update = run(root, 'init', '--skill=all', '--force');
  assert.equal(update.status, 0, update.stderr);
  await verifyCopy(parent, analyticsSource);
  await verifyCopy(path.join(root, shared));
});

test('analytics dry run and reinstall preserve local files and unchanged copies', async (t) => {
  const root = await workspace(t);
  const dryRun = run(root, 'init', 'not-created', '--skill=all', '--dry-run');
  assert.equal(dryRun.status, 0, dryRun.stderr);
  assert.match(dryRun.stdout, /website-analytics/);
  assert.deepEqual(await readdir(root), []);
  assert.equal(run(root, 'init', '--skill=website-analytics', '--provider=codex').status, 0);
  const parent = path.join(root, '.agents/skills/website-analytics');
  const installed = path.join(parent, 'SKILL.md');
  const before = await stat(installed);
  await writeFile(path.join(parent, 'client-notes.md'), 'Keep private notes');
  const repeat = run(root, 'init', '--skill=website-analytics', '--provider=codex');
  assert.equal(repeat.status, 0, repeat.stderr);
  assert.equal((await stat(installed)).mtimeMs, before.mtimeMs);
  await writeFile(installed, 'Local customization');
  const preview = run(root, 'init', '--skill=website-analytics', '--provider=codex', '--force', '--dry-run');
  assert.equal(preview.status, 0, preview.stderr);
  assert.equal(await readFile(installed, 'utf8'), 'Local customization');
  assert.equal(run(root, 'init', '--skill=website-analytics', '--provider=codex', '--force').status, 0);
  await verifyCopy(parent, analyticsSource);
  assert.equal(await readFile(path.join(parent, 'client-notes.md'), 'utf8'), 'Keep private notes');
});

test('an inquiry conflict stops every selected skill before writes and force preserves extras', async (t) => {
  const root = await workspace(t);
  const parent = path.join(root, '.claude/skills/website-inquiries');
  await mkdir(parent, { recursive: true });
  const existing = path.join(parent, 'SKILL.md');
  await writeFile(existing, 'Client customization');
  await writeFile(path.join(parent, 'private-notes.md'), 'Keep notes');
  const result = run(root, 'init', '--skill=all');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--force/);
  assert.deepEqual(await readdir(root), ['.claude']);
  assert.deepEqual(await readdir(path.join(root, '.claude/skills')), ['website-inquiries']);
  assert.equal(await readFile(existing, 'utf8'), 'Client customization');
  const update = run(root, 'init', '--skill=all', '--force');
  assert.equal(update.status, 0, update.stderr);
  await verifyCopy(parent, inquiriesSource);
  await verifyCopy(path.join(root, shared));
  await verifyCopy(path.join(root, '.agents/skills/website-analytics'), analyticsSource);
  assert.equal(await readFile(path.join(parent, 'private-notes.md'), 'utf8'), 'Keep notes');
});

test('inquiry selection composes with analytics and respects dry run and idempotence', async (t) => {
  const root = await workspace(t);
  const options = ['--skill=website-inquiries,website-analytics', '--skill=website-inquiries', '--provider=codex,antigravity'];
  const preview = run(root, 'init', ...options, '--dry-run');
  assert.equal(preview.status, 0, preview.stderr);
  assert.match(preview.stdout, /website-inquiries/);
  assert.deepEqual(await readdir(root), []);
  const installed = run(root, 'init', ...options);
  assert.equal(installed.status, 0, installed.stderr);
  assert.equal(installed.stdout.split('written').length - 1, 2);
  const parent = path.join(root, '.agents/skills');
  assert.deepEqual((await readdir(parent)).sort(), ['website-analytics', 'website-inquiries']);
  await verifyCopy(path.join(parent, 'website-inquiries'), inquiriesSource);
  await verifyCopy(path.join(parent, 'website-analytics'), analyticsSource);
  const before = await stat(path.join(parent, 'website-inquiries/SKILL.md'));
  const repeated = run(root, 'init', ...options);
  assert.equal(repeated.status, 0, repeated.stderr);
  assert.equal((await stat(path.join(parent, 'website-inquiries/SKILL.md'))).mtimeMs, before.mtimeMs);
});

test('showcase installs alone, deduplicates shared providers, and includes executable helper source', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init', '--skill=company-profile-showcase', '--skill=company-profile-showcase',
    '--provider=codex,antigravity,claude-code');
  assert.equal(result.status, 0, result.stderr);
  for (const provider of ['.agents', '.claude']) {
    const parent = path.join(root, provider, 'skills');
    assert.deepEqual(await readdir(parent), ['company-profile-showcase']);
    const target = path.join(parent, 'company-profile-showcase');
    await verifyCopy(target, showcaseSource);
    const check = spawnSync(process.execPath,
      [path.join(target, 'scripts/validate-storyboard.mjs'), path.join(target, 'assets/storyboard.example.json')],
      { cwd: root, encoding: 'utf8' });
    assert.ifError(check.error);
    assert.equal(check.status, 0, check.stderr);
    assert.equal(JSON.parse(check.stdout).total_frames, 600);
  }
  assert.equal(result.stdout.split('written').length - 1, 2);
});

test('showcase conflict stops all skills and providers; dry run and force preserve custom work', async (t) => {
  const root = await workspace(t);
  const preview = run(root, 'init', '--skill=company-profile-showcase', '--dry-run');
  assert.equal(preview.status, 0, preview.stderr);
  assert.deepEqual(await readdir(root), []);
  const parent = path.join(root, '.claude/skills/company-profile-showcase');
  await mkdir(parent, { recursive: true });
  const existing = path.join(parent, 'SKILL.md');
  await writeFile(existing, 'Custom showcase instructions');
  await writeFile(path.join(parent, 'custom-scene.json'), '{}');
  const conflict = run(root, 'init', '--skill=all');
  assert.equal(conflict.status, 1);
  assert.match(conflict.stderr, /--force/);
  assert.deepEqual(await readdir(root), ['.claude']);
  assert.deepEqual(await readdir(path.join(root, '.claude/skills')), ['company-profile-showcase']);
  const dryUpdate = run(root, 'init', '--skill=all', '--force', '--dry-run');
  assert.equal(dryUpdate.status, 0, dryUpdate.stderr);
  assert.equal(await readFile(existing, 'utf8'), 'Custom showcase instructions');
  assert.deepEqual(await readdir(root), ['.claude']);
  const update = run(root, 'init', '--skill=all', '--force');
  assert.equal(update.status, 0, update.stderr);
  await verifyCopy(parent, showcaseSource);
  assert.equal(await readFile(path.join(parent, 'custom-scene.json'), 'utf8'), '{}');
  const before = await stat(existing);
  const repeat = run(root, 'init', '--skill=company-profile-showcase');
  assert.equal(repeat.status, 0, repeat.stderr);
  assert.equal((await stat(existing)).mtimeMs, before.mtimeMs);
});
