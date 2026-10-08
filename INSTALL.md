# Pemasangan lintas provider

Simpan satu sumber di `skills/company-profile-website/`. CLI `comp-ile init`
memasang seluruh file paket, termasuk `references/` dan `assets/`, ke lokasi
yang dibaca aplikasi tujuan. Tautan relatif dalam instruksi tetap berfungsi.

## Pasang CLI dari GitHub

Memerlukan Node.js 20 atau lebih baru, npm, serta Git untuk mengambil paket dari
GitHub. Setelah perubahan CLI tersedia di repository GitHub:

```sh
npm install -g github:Valerie6048/comp-ile-skills
comp-ile init
```

Command `init` menggunakan direktori kerja saat ini. Untuk tujuan lain:

```sh
comp-ile init ./website
comp-ile init --dir "./website perusahaan"
```

Direktori yang belum ada dibuat otomatis. Default memasang untuk ketiga provider
dengan dua lokasi: Codex dan Antigravity berbagi `.agents/skills/`, sedangkan
Claude Code memakai `.claude/skills/`.

Jika tidak ingin instalasi global, jalankan sekali melalui npm:

```sh
npx --yes --package=github:Valerie6048/comp-ile-skills comp-ile init ./website
```

Pengambilan GitHub memakai [npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/),
nama command memakai [`bin`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#bin),
dan eksekusi paket sementara memakai [npm exec/npx](https://docs.npmjs.com/cli/v11/commands/npm-exec/).
Paket ini belum diterbitkan ke registry npm; gunakan sumber GitHub di command.

## Opsi CLI

| Opsi | Perilaku |
| --- | --- |
| `init [direktori]` | Memasang ke direktori ini; default direktori kerja |
| `--dir <direktori>` | Alternatif argumen tujuan; gunakan satu bentuk saja |
| `--provider <nama>` | `all` (default), `codex`, `claude-code`, atau `antigravity` |
| `--provider codex,claude-code` | Memilih beberapa provider; opsi juga dapat diulang |
| `--dry-run` | Memeriksa tujuan dan menampilkan rencana tanpa menulis |
| `--force` | Memperbarui file paket yang berbeda, mempertahankan file tambahan |
| `--help` / `--version` | Bantuan atau versi CLI |

```sh
comp-ile init --provider claude-code
comp-ile init ./website --provider codex,antigravity
comp-ile init ./website --dry-run
comp-ile init ./website --force
```

Menjalankan ulang tidak menulis file yang sudah sama. Konflik file diperiksa di
semua tujuan sebelum penyalinan dimulai. Jika file paket berbeda, command gagal
dengan daftar konflik; tinjau lalu gunakan `--force` untuk menggantinya. Opsi itu
tidak menghapus file tambahan. Jalur provider atau file paket yang berupa
symlink/junction, serta konflik tipe file/folder, tetap ditolak walaupun memakai
`--force` agar penyalinan mengikuti tujuan proyek.

Untuk memperbarui sumber skill, pasang ulang CLI dari GitHub, kemudian jalankan
`comp-ile init --force` pada proyek yang ingin diperbarui. Gunakan ref GitHub
`#tag-atau-commit` pada spesifikasi instalasi bila ingin memilih versi tertentu.

Pada Windows, jika PowerShell memblokir wrapper `.ps1` npm, gunakan `npm.cmd`,
`npx.cmd`, atau `comp-ile.cmd` untuk command yang bersangkutan.

## Format paket

Format intinya mengikuti [Agent Skills](https://agentskills.io/specification):
`SKILL.md` dengan frontmatter `name` dan `description`, lalu instruksi Markdown.
Skill ini tidak memakai sintaks eksekusi khusus Claude, path komputer pembuat,
atau nama tool provider dalam alur utamanya.

`agents/openai.yaml` merupakan metadata opsional khusus lingkungan OpenAI.
Alur skill tidak bergantung padanya; untuk provider lain, folder itu boleh
ditinggalkan dalam paket atau dikecualikan. Tidak perlu menerjemahkan metadata
tersebut menjadi instruksi untuk provider lain.

## Lokasi pemasangan

Dokumentasi diperiksa pada 7 Oktober 2026. `~` berarti direktori pribadi pengguna,
misalnya `C:\Users\nama-pengguna` di Windows. Tabel ini untuk aplikasi lokal;
lingkungan cloud memiliki mekanisme discovery tersendiri.

| Aplikasi | Untuk satu proyek | Untuk semua proyek pengguna |
| --- | --- | --- |
| Codex | `<proyek>/.agents/skills/company-profile-website/` | `~/.agents/skills/company-profile-website/` |
| Claude Code | `<proyek>/.claude/skills/company-profile-website/` | `~/.claude/skills/company-profile-website/` |
| Antigravity 2.0 / IDE | `<proyek>/.agents/skills/company-profile-website/` | `~/.gemini/config/skills/company-profile-website/` |
| Antigravity CLI | `<proyek>/.agents/skills/company-profile-website/` | `~/.gemini/antigravity-cli/skills/company-profile-website/` |

Lokasi dan perilaku discovery mengikuti dokumentasi resmi
[OpenAI](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills), dan
[Antigravity](https://antigravity.google/docs/skills).
Antigravity juga mendokumentasikan beberapa path lama; gunakan path terbaru di
tabel untuk pemasangan baru. Versi aplikasi yang lebih lama perlu diperiksa
terhadap dokumentasi versinya.

CLI saat ini memasang skill dengan cakupan proyek pada Windows, macOS, dan Linux.
Lokasi global pada tabel disediakan untuk pemasangan skill pribadi secara manual;
instalasi global CLI dan pemasangan global skill adalah dua pilihan berbeda.
Hindari pemasangan skill global dan proyek yang bernama sama jika tidak membutuhkan
perilaku prioritas/duplikasi provider.

## Pemanggilan dan pengecekan

| Aplikasi | Pemanggilan eksplisit |
| --- | --- |
| Codex | `Gunakan $company-profile-website untuk membuat website perusahaan saya.` |
| Claude Code | `/company-profile-website` diikuti brief |
| Antigravity 2.0 / CLI | `/company-profile-website` diikuti brief |

Cara pemanggilan mengikuti [panduan OpenAI](https://learn.chatgpt.com/docs/build-skills),
[Claude Code](https://code.claude.com/docs/en/skills), dan
[Antigravity](https://antigravity.google/docs/skills). Deskripsi skill juga dapat
membantu pemilihan otomatis ketika permintaan pengguna relevan.

Sesudah menyalin, periksa daftar skill atau menu perintah di aplikasi tujuan.
Jika belum terdeteksi, buka sesi baru atau reload sesuai aplikasi dan pastikan
folder yang dibuka benar serta `SKILL.md` berada langsung dalam folder skill.
Di Codex, dokumentasi menyarankan restart jika skill baru tidak muncul. Di
Claude Code, `/reload-skills` dapat memuat direktori skill baru. Antigravity IDE
menyediakan daftar aktif melalui menu Customizations.

Coba dengan brief perusahaan dan bahan yang sama pada tiap aplikasi. Periksa
apakah agent membaca referensi, menanyakan data penting yang kurang, mengikuti
stack proyek, dan tidak membuat bukti bisnis palsu. Lanjutkan sampai implementasi
serta QA bila tujuan uji adalah pembuatan website lengkap.

Format paket yang sama mendukung portabilitas instruksi. Hasil dan kemampuan
eksekusi tetap dipengaruhi model, tool browser/shell, izin, serta lingkungan
masing-masing. Jika browser atau hosting tidak tersedia, agent harus melaporkan
bagian yang belum diverifikasi atau belum dapat dijalankan.

## Berbagi dan pembaruan

Bagikan repository atau arsip yang memuat seluruh folder
`company-profile-website/`. Pengguna memasangnya sesuai tabel. Packaging plugin
dapat ditambahkan untuk distribusi melalui sistem plugin aplikasi tertentu;
manifest plugin tiap aplikasi perlu diperlakukan terpisah dari inti skill.

Repository ini menyediakan CLI dan sumber skill. Test memverifikasi penyalinan
paket serta perilaku command dalam proyek sementara. Uji perilaku agent di dalam
aplikasi Codex, Claude Code, dan Antigravity masih merupakan pemeriksaan terpisah.
