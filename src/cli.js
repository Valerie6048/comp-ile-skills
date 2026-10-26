import { readFile } from 'node:fs/promises';
import { installSkill, providerNames, skillNames } from './installer.js';

const HELP = `comp-ile - website skills installer

Usage:
  comp-ile init [directory] [options]

Options:
  --skill <name>     Skill name, comma-separated names, or all; repeatable.
                     Available: ${skillNames.join(', ')}.
                     Default: company-profile-website.
  --provider <name>  all (default), codex, claude-code, antigravity
                     Separate with commas or repeat the option for multiple providers.
  --dir <directory> Destination directory; defaults to the current working directory.
  --force            Update differing packaged files; preserve additional files.
  --dry-run          Display the plan without writing files.
  -h, --help         Display help.
  -v, --version      Display the version.

Examples:
  comp-ile init
  comp-ile init ./website --provider claude-code
  comp-ile init ./website --skill website-analytics
  comp-ile init ./website --skill website-inquiries
  comp-ile init ./website --skill company-profile-showcase
  comp-ile init ./website --skill all --provider codex
  comp-ile init --dir "./company website" --provider codex,antigravity
  comp-ile init --dry-run
`;

export function parseArgs(args) {
  if (args.length === 0) return { action: 'help' };
  if (args.length === 1 && ['--version', '-v'].includes(args[0])) {
    return { action: 'version' };
  }
  if (['--help', '-h'].includes(args[0])) return { action: 'help' };
  if (args[0] !== 'init') {
    throw new Error(`Unknown command: ${args[0]}. Use comp-ile --help.`);
  }

  const options = { action: 'init', directory: '.', providers: [], force: false, dryRun: false };
  let directoryWasSet = false;
  let positionalOnly = false;
  const setDirectory = (value) => {
    if (!value || directoryWasSet) {
      throw new Error('Provide one destination directory, as an argument or through --dir.');
    }
    options.directory = value;
    directoryWasSet = true;
  };

  for (let index = 1; index < args.length; index += 1) {
    const arg = args[index];
    if (positionalOnly) {
      setDirectory(arg);
      continue;
    }
    if (arg === '--') {
      positionalOnly = true;
      continue;
    }
    if (arg === '--help' || arg === '-h') return { action: 'help' };
    if (arg === '--force') {
      options.force = true;
      continue;
    }
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }
    if (['--provider', '--skill', '--dir'].includes(arg) || ['--provider=', '--skill=', '--dir='].some((flag) => arg.startsWith(flag))) {
      const equalIndex = arg.indexOf('=');
      const flag = equalIndex === -1 ? arg : arg.slice(0, equalIndex);
      const value = equalIndex === -1 ? args[++index] : arg.slice(equalIndex + 1);
      if (!value || (equalIndex === -1 && value.startsWith('-'))) {
        throw new Error(`${flag} requires a value.`);
      }
      if (flag === '--dir') {
        setDirectory(value);
      } else if (flag === '--provider') {
        const names = value.split(',').map((name) => name.trim());
        for (const name of names) {
          if (name !== 'all' && !providerNames.includes(name)) {
            throw new Error(`Unknown provider: ${name || '(empty)'}. Choose all, ${providerNames.join(', ')}.`);
          }
        }
        options.providers.push(...names);
      } else {
        const names = value.split(',').map((name) => name.trim());
        for (const name of names) {
          if (name !== 'all' && !skillNames.includes(name)) {
            throw new Error(`Unknown skill: ${name || '(empty)'}. Choose all, ${skillNames.join(', ')}.`);
          }
        }
        options.skills ??= [];
        options.skills.push(...names);
      }
      continue;
    }
    if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}. Use comp-ile --help.`);
    setDirectory(arg);
  }

  if (options.providers.length === 0 || options.providers.includes('all')) {
    options.providers = [...providerNames];
  }
  options.providers = [...new Set(options.providers)];
  if (options.skills) {
    options.skills = options.skills.includes('all') ? [...skillNames] : [...new Set(options.skills)];
  }
  return options;
}

export async function runCLI(args) {
  const options = parseArgs(args);
  if (options.action === 'help') {
    console.log(HELP);
    return;
  }
  if (options.action === 'version') {
    const packageInfo = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
    console.log(packageInfo.version);
    return;
  }

  const result = await installSkill(options);
  console.log(`${options.dryRun ? 'Installation plan' : 'Project'}: ${result.directory}`);
  for (const target of result.targets) {
    const changed = target.files.filter((file) => file.action !== 'unchanged').length;
    const unchanged = target.files.length - changed;
    console.log(`  ${target.relativePath} (${changed} ${options.dryRun ? 'to write' : 'written'}, ${unchanged} unchanged)`);
  }
  console.log(options.dryRun
    ? 'Dry run complete; no files were written.'
    : 'The selected skills are ready for discovery by the target application. Open or reload the session if needed.');
}
