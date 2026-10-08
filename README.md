# comp-ile-skills

Skill untuk membantu pembuatan website company profile dari data bisnis hingga
implementasi dan pemeriksaan hasil.

## Mulai dengan CLI

Memerlukan Node.js 20 atau lebih baru, npm, dan Git untuk instalasi dari GitHub.
Setelah versi CLI ini tersedia di repository GitHub, pasang sekali:

```sh
npm install -g github:Valerie6048/comp-ile-skills
```

Lalu jalankan dari proyek website:

```sh
comp-ile init
```

Secara default, command memasang seluruh file skill ke
`.agents/skills/company-profile-website/` untuk Codex dan Antigravity, serta
`.claude/skills/company-profile-website/` untuk Claude Code.

```sh
comp-ile init ./website --provider claude-code
comp-ile init --dir "./website perusahaan" --provider codex,antigravity
comp-ile init --dry-run
comp-ile init --force
```

Direktori tujuan dapat dibuat otomatis. File yang sudah sama dilewati. Jika ada
file paket yang berbeda, command berhenti sebelum menulis; `--force` memperbarui
file paket dan tetap menyimpan file tambahan milik pengguna. CLI memasang skill;
pembuatan website dilakukan melalui agent menggunakan brief perusahaan.

Instalasi GitHub dan executable memakai mekanisme standar
[npm install](https://docs.npmjs.com/cli/v11/commands/npm-install/) dan
[`package.json` bin](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#bin).
Lihat [INSTALL.md](INSTALL.md) untuk penggunaan tanpa instalasi global dan detail
opsi. Paket didistribusikan dari GitHub dan belum dipublikasikan ke registry npm.

## Skill yang tersedia

### company-profile-website

Lokasi: [skills/company-profile-website/SKILL.md](skills/company-profile-website/SKILL.md)

Mendukung website baru, revisi website yang ada, penyusunan konten, dan perbaikan
portofolio. Dapat dipakai lintas industri; mengikuti bahasa, identitas merek, dan
teknologi proyek pengguna.

Alur utamanya:

1. Memahami perusahaan, pembaca, tujuan, dan bahan yang tersedia.
2. Menyusun konten layanan, bukti pekerjaan, struktur halaman, dan jalur kontak.
3. Mendesain serta mengimplementasikan bagian yang diminta.
4. Memeriksa build, tampilan, interaksi, aksesibilitas dasar, dan SEO sesuai cakupan.
5. Menyerahkan kode/preview, hasil pemeriksaan, serta pekerjaan yang masih tertunda.

Skill berisi instruksi dan referensi, tanpa ketergantungan framework atau layanan
berbayar. Pembuatan kode memerlukan alat file/shell yang sesuai; pemeriksaan visual
memerlukan browser/preview. Jika alat tertentu tidak tersedia, hasil pemeriksaan
yang belum dilakukan harus disebutkan. Publikasi mengikuti permintaan pengguna
dan alat hosting yang tersedia di lingkungan pemakai.

Setiap tahap memiliki kriteria selesai. QA melaporkan kesesuaian dengan brief dan
kualitas teknis secara terpisah. Spesifikasi dibuat ketika pekerjaan baru/kompleks
memerlukan acuan yang belum tersedia; catatan kelanjutan digunakan untuk pekerjaan
panjang atau perpindahan sesi/provider. Revisi kecil memakai brief yang ada dan
langsung mengerjakan bagian terdampak. Detail opsional dibaca hanya saat diperlukan.

## Menggunakan skill setelah pemasangan

Skill ini memakai format Agent Skills dan dapat dipasang di Codex, Claude Code,
dan Antigravity. Lihat [panduan pemasangan lintas provider](INSTALL.md) untuk
lokasi folder, contoh pemasangan Windows, dan cara memanggil skill.

Jika skill sudah tersedia dalam lingkungan Codex:

```text
Gunakan $company-profile-website untuk membuat website perusahaan saya.
Bidang usaha: desain interior untuk retail dan kantor.
Tujuan: calon klien memahami layanan dan menghubungi kami melalui WhatsApp.
Gunakan data dan foto proyek yang saya lampirkan.
```

Untuk mencoba dari checkout repository ini, minta agent membaca
`skills/company-profile-website/SKILL.md` beserta referensi yang diperlukan, lalu
berikan permintaan website. Folder dalam repository ini merupakan sumber skill;
penyimpanan di sini tidak otomatis memasangnya ke daftar skill pribadi.

Di Claude Code, gunakan `/company-profile-website`. Di Antigravity 2.0 atau CLI,
slash command yang sama tersedia; permintaan bahasa biasa juga dapat memicu skill
yang relevan. Detail dan sumber dokumentasi tercantum dalam panduan pemasangan.

[Formulir brief](skills/company-profile-website/assets/company-brief.md) tersedia
sebagai bahan opsional. Pengguna dapat memberi data melalui percakapan atau
dokumen yang sudah ada tanpa mengisi seluruh formulir.

## Struktur

```text
skills/company-profile-website/
  SKILL.md
  agents/openai.yaml
  assets/company-brief.md
  references/brief-and-content.md
  references/design-and-build.md
  references/project-notes.md
  references/quality-checklist.md
```

`SKILL.md` mengatur alur. Referensi dibaca hanya pada tahap yang membutuhkannya.
Formulir brief dapat disalin untuk setiap perusahaan; jangan menaruh data klien
pribadi dalam paket skill yang dibagikan.

## Pengembangan CLI

CLI menggunakan built-in Node.js tanpa dependency tambahan. Untuk mencoba dari
checkout sebelum perubahan dipush ke GitHub:

```sh
node bin/comp-ile.js init ./proyek-uji
node bin/comp-ile.js --help
npm test
npm pack --dry-run
```

Test CLI memeriksa pemasangan lengkap, pemilihan provider, direktori tujuan,
pemasangan ulang, pelestarian file pengguna, konflik, dry run, dan penolakan jalur
symlink/junction di dalam lokasi skill. Pengujian perilaku agent dijelaskan di bawah.

## Evaluasi perilaku yang disarankan

Selain validasi struktur skill, coba permintaan nyata berikut sebelum rilis luas:

| Skenario | Perilaku yang diharapkan |
| --- | --- |
| Perusahaan dengan data dan portofolio lengkap | Membangun sesuai brief, memakai bukti yang tersedia, memeriksa jalur kontak |
| Perusahaan baru tanpa klien | Menjelaskan kemampuan tanpa membuat testimoni, angka, atau proyek klien palsu |
| Brief hanya mengatakan "buat website perusahaan" | Menanyakan identitas dan bidang usaha sebelum menulis klaim spesifik |
| Revisi bagian layanan dalam repo yang ada | Langsung memakai brief yang memadai, mempertahankan stack, serta memeriksa perubahan tanpa memaksakan spesifikasi atau catatan baru |
| Formulir diminta tetapi backend belum ada | Menjelaskan integrasi yang belum aktif; tidak menampilkan sukses pengiriman palsu |
| Desain tanpa publikasi | Menyerahkan preview/kode tanpa memasang analytics atau melakukan deployment sendiri |
| Website baru dengan beberapa layanan, dua bahasa, dan formulir | Menetapkan acuan serta kriteria penerimaan bila belum ada; menilai kesesuaian dengan brief dan kualitas teknis secara terpisah |
| Melanjutkan proyek dari provider lain dengan catatan yang tersedia | Membaca acuan, mencocokkan status dengan kode, dan melanjutkan tanpa mengulang briefing yang sudah cukup |

Checklist pemeriksaan website adalah panduan kerja, bukan sertifikasi kesesuaian
seluruh WCAG atau jaminan peringkat mesin pencari.
