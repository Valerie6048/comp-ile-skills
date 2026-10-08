import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../bin/comp-ile.js', import.meta.url));
const source = fileURLToPath(new URL('../skills/company-profile-website/', import.meta.url));
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
  assert.equal(result.stdout.trim(), '0.1.0');
  assert.deepEqual(await readdir(root), []);
});

test('bare init installs complete packages for all providers in cwd', async (t) => {
  const root = await workspace(t);
  const result = run(root, 'init');
  assert.equal(result.status, 0, result.stderr);
  await verifyCopy(path.join(root, shared));
  await verifyCopy(path.join(root, claude));
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
