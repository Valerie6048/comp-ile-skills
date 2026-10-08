import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readFile, readdir, realpath, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL_NAME = 'company-profile-website';
const SOURCE = fileURLToPath(new URL(`../skills/${SKILL_NAME}/`, import.meta.url));
const PROVIDERS = {
  codex: '.agents/skills',
  'claude-code': '.claude/skills',
  antigravity: '.agents/skills',
};

export const providerNames = Object.keys(PROVIDERS);

async function inspect(filePath) {
  try {
    return await lstat(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

// Resolve an explicitly chosen project through its existing parent, including
// when the project has not been created yet. Provider paths stay within this root.
async function resolveProject(directory) {
  const pending = [];
  let ancestor = path.resolve(directory);
  while (!(await inspect(ancestor))) {
    pending.unshift(path.basename(ancestor));
    ancestor = path.dirname(ancestor);
  }
  if (!(await stat(ancestor)).isDirectory()) {
    throw new Error(`The destination must be a directory: ${ancestor}`);
  }
  return path.join(await realpath(ancestor), ...pending);
}

async function collectFiles(directory, relative = '') {
  const files = [];
  const entries = await readdir(path.join(directory, relative), { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));
  for (const entry of entries) {
    const entryPath = path.join(relative, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(directory, entryPath));
    } else if (entry.isFile()) {
      files.push({ relativePath: entryPath, sourcePath: path.join(directory, entryPath) });
    } else {
      throw new Error(`The skill package contains an unsupported file type: ${entryPath}`);
    }
  }
  return files;
}

async function checkDirectories(projectRoot, relativeDirectory) {
  let current = projectRoot;
  for (const part of relativeDirectory.split(path.sep)) {
    current = path.join(current, part);
    const info = await inspect(current);
    if (info?.isSymbolicLink()) {
      throw new Error(`The destination folder is a symlink/junction: ${current}. Use an ordinary directory.`);
    }
    if (info && !info.isDirectory()) {
      throw new Error(`A file already occupies the destination directory path: ${current}`);
    }
  }
}

export async function installSkill({ directory = '.', providers = providerNames, force = false, dryRun = false }) {
  if (providers.length === 0 || providers.some((provider) => !Object.hasOwn(PROVIDERS, provider))) {
    throw new Error('Choose at least one supported provider.');
  }
  const projectRoot = await resolveProject(directory);
  const sourceFiles = await collectFiles(SOURCE);
  if (!sourceFiles.some((file) => file.relativePath === 'SKILL.md')) {
    throw new Error('The package is incomplete: SKILL.md was not found.');
  }

  const targetDirectories = [...new Set(providers.map((provider) => PROVIDERS[provider]))];
  const targets = [];
  const conflicts = [];

  // Preflight every selected provider before writing any files, so a known
  // conflict in one provider does not leave a new installation in another.
  for (const providerDirectory of targetDirectories) {
    const relativePath = path.join(providerDirectory, SKILL_NAME);
    const target = { relativePath, files: [] };
    await checkDirectories(projectRoot, relativePath);
    for (const sourceFile of sourceFiles) {
      const destinationRelative = path.join(relativePath, sourceFile.relativePath);
      await checkDirectories(projectRoot, path.dirname(destinationRelative));
      const destination = path.join(projectRoot, destinationRelative);
      const info = await inspect(destination);
      let action = 'create';
      if (info) {
        if (info.isSymbolicLink() || !info.isFile()) {
          throw new Error(`The destination is not a regular file: ${destination}`);
        }
        const [sourceData, destinationData] = await Promise.all([
          readFile(sourceFile.sourcePath), readFile(destination),
        ]);
        action = sourceData.equals(destinationData) ? 'unchanged' : 'update';
        if (action === 'update' && !force) conflicts.push(destinationRelative);
      }
      target.files.push({ ...sourceFile, destination, action });
    }
    targets.push(target);
  }

  if (conflicts.length > 0) {
    throw new Error(`Destination files differ; no files have been written:\n  ${conflicts.join('\n  ')}\nReview the changes, then use --force to update packaged files.`);
  }

  if (!dryRun) {
    for (const target of targets) {
      for (const file of target.files) {
        if (file.action === 'unchanged') continue;
        await mkdir(path.dirname(file.destination), { recursive: true });
        // Exclusive creation also prevents accidental overwrite if another
        // process creates a destination after preflight.
        await copyFile(file.sourcePath, file.destination,
          file.action === 'create' ? constants.COPYFILE_EXCL : 0);
      }
    }
  }
  return { directory: projectRoot, targets };
}
