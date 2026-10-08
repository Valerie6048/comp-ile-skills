import { readFile } from 'node:fs/promises';
import { installSkill, providerNames } from './installer.js';

const HELP = `comp-ile - pemasang skill website company profile

Penggunaan:
  comp-ile init [direktori] [opsi]

Opsi:
  --provider <nama>  all (default), codex, claude-code, antigravity
                     Pisahkan dengan koma atau ulangi opsi untuk beberapa provider.
  --dir <direktori>  Direktori tujuan; default direktori kerja saat ini.
  --force            Perbarui file paket yang berbeda; file tambahan tetap disimpan.
  --dry-run          Tampilkan rencana tanpa menulis file.
  -h, --help         Tampilkan bantuan.
  -v, --version      Tampilkan versi.

Contoh:
  comp-ile init
  comp-ile init ./website --provider claude-code
  comp-ile init --dir "./website perusahaan" --provider codex,antigravity
  comp-ile init --dry-run
`;

export function parseArgs(args) {
  if (args.length === 0) return { action: 'help' };
  if (args.length === 1 && ['--version', '-v'].includes(args[0])) {
    return { action: 'version' };
  }
  if (['--help', '-h'].includes(args[0])) return { action: 'help' };
  if (args[0] !== 'init') {
    throw new Error(`Perintah tidak dikenal: ${args[0]}. Gunakan comp-ile --help.`);
  }

  const options = { action: 'init', directory: '.', providers: [], force: false, dryRun: false };
  let directoryWasSet = false;
  let positionalOnly = false;
  const setDirectory = (value) => {
    if (!value || directoryWasSet) {
      throw new Error('Berikan satu direktori tujuan, melalui argumen atau --dir.');
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
    if (arg === '--provider' || arg === '--dir' || arg.startsWith('--provider=') || arg.startsWith('--dir=')) {
      const equalIndex = arg.indexOf('=');
      const flag = equalIndex === -1 ? arg : arg.slice(0, equalIndex);
      const value = equalIndex === -1 ? args[++index] : arg.slice(equalIndex + 1);
      if (!value || (equalIndex === -1 && value.startsWith('-'))) {
        throw new Error(`${flag} membutuhkan nilai.`);
      }
      if (flag === '--dir') {
        setDirectory(value);
      } else {
        const names = value.split(',').map((name) => name.trim());
        for (const name of names) {
          if (name !== 'all' && !providerNames.includes(name)) {
            throw new Error(`Provider tidak dikenal: ${name || '(kosong)'}. Pilih all, ${providerNames.join(', ')}.`);
          }
        }
        options.providers.push(...names);
      }
      continue;
    }
    if (arg.startsWith('-')) throw new Error(`Opsi tidak dikenal: ${arg}. Gunakan comp-ile --help.`);
    setDirectory(arg);
  }

  if (options.providers.length === 0 || options.providers.includes('all')) {
    options.providers = [...providerNames];
  }
  options.providers = [...new Set(options.providers)];
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
  console.log(`${options.dryRun ? 'Rencana pemasangan' : 'Proyek'}: ${result.directory}`);
  for (const target of result.targets) {
    const changed = target.files.filter((file) => file.action !== 'unchanged').length;
    const unchanged = target.files.length - changed;
    console.log(`  ${target.relativePath} (${changed} ${options.dryRun ? 'akan ditulis' : 'ditulis'}, ${unchanged} sudah sama)`);
  }
  console.log(options.dryRun
    ? 'Dry run selesai; tidak ada file yang ditulis.'
    : 'Skill siap ditemukan oleh aplikasi tujuan. Buka atau reload sesi jika belum muncul.');
}
