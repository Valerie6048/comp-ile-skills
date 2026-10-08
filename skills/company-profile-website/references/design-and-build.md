# Desain dan implementasi website

## Pilih implementasi sesuai kebutuhan

Periksa repo, instruksi lokal, komponen, dependencies, dan perintah build yang
tersedia. Jangan mengganti framework atau menambahkan CMS hanya untuk mengikuti
preferensi skill. Untuk proyek baru, situs statis memadai bila konten jarang berubah
dan tidak ada kebutuhan aplikasi. CMS, backend, atau framework dipilih ketika
pengelolaan konten, integrasi, atau kebutuhan pengguna membenarkannya.

Jika pengguna menetapkan platform atau penyedia hosting, ikuti pilihan tersebut.
Jika lingkungan menyediakan workflow khusus pembuatan/hosting website, gunakan
sesuai instruksinya tanpa menjadikan ketergantungan itu wajib bagi semua pengguna.
Skill ini tidak membawa template kode atau dependensi vendor tertentu.

## Arah visual dan layout

Tetapkan warna, tipografi, skala jarak, lebar konten, perlakuan gambar, dan gaya
komponen dari merek serta kebutuhan pembaca. Desain profesional dapat bersifat
formal, hangat, editorial, atau ekspresif sesuai industri. Hindari memaksakan satu
warna, layout kartu, animasi, atau tema ke seluruh perusahaan.

Utamakan pesan utama dan jalur tindakan. Gunakan hierarki visual, ruang kosong,
teks terbaca, serta visual yang menunjukkan pekerjaan ketika tersedia. Navigasi
memuat bagian yang benar-benar ada. CTA utama memakai tujuan yang konsisten;
CTA pendamping dapat menuju layanan atau studi kasus.

Mulai dari lebar mobile; susun ulang grid dan navigasi sesuai konten. Konten tetap
terbaca tanpa hover. Menu mobile menggunakan tombol dengan nama, status terbuka,
dan perilaku keyboard yang tepat. Pastikan header tetap tidak menutup anchor atau
elemen yang sedang fokus. Animasi mendukung pemahaman dan menghormati preferensi
reduced motion; informasi penting tidak boleh hilang saat animasi dinonaktifkan.

## Aksesibilitas

Gunakan WCAG 2.2 level AA sebagai sasaran bila tidak ada target pengguna yang
lebih spesifik. Checklist skill ini mencakup sebagian pemeriksaan; kelulusan build
atau audit otomatis tidak membuktikan kesesuaian seluruh WCAG.

- Gunakan landmark HTML, urutan heading logis, bahasa dokumen, tautan untuk
  navigasi, tombol untuk tindakan, dan skip link bila navigasi berulang memerlukannya.
- Semua kontrol dapat dioperasikan dengan keyboard dan memiliki fokus terlihat.
  Hindari focus trap; modal mengelola fokus masuk, keluar, dan pengembalian fokus.
- Gunakan alt yang bermakna untuk gambar informatif dan alt kosong untuk dekorasi.
  Kontrol ikon memiliki nama yang dapat dibaca teknologi bantu.
- Kontras teks normal setidaknya 4.5:1; teks besar setidaknya 3:1 sesuai definisi
  WCAG. Jangan menganggap semua heading otomatis termasuk teks besar.
- Untuk target pointer, ikuti minimum 24 x 24 CSS px atau aturan jarak/pengecualian
  pada SC 2.5.8. Target sekitar 44 x 44 px dapat dipilih untuk kenyamanan; ini
  rekomendasi desain, bukan minimum universal WCAG AA.
- Jangan mengandalkan warna saja untuk status. Berikan label input, petunjuk,
  pesan kesalahan yang terhubung, serta pengumuman status yang sesuai.
- Periksa pembesaran teks dan reflow, termasuk viewport sempit; jangan mengunci
  zoom. Hindari horizontal scroll untuk konten biasa.

## Kontak dan formulir

Pilih kanal dari data perusahaan: telepon, email, WhatsApp, atau formulir. Validasi
format tujuan; untuk WhatsApp gunakan nomor internasional dan pesan yang di-encode.
Jangan menambahkan nomor atau alamat contoh sebagai tujuan aktif.

Jika backend tidak tersedia, gunakan kanal kontak yang terkonfirmasi. Jika pengguna
meminta mockup formulir, beri label bahwa pengiriman belum terhubung dan jangan
menampilkan sukses pengiriman palsu. `mailto:` membuka aplikasi email; jangan
menyebutnya sebagai pengiriman yang sudah diterima perusahaan.

Untuk formulir terintegrasi, implementasikan validasi server, status loading,
kegagalan dan keberhasilan yang nyata, perlindungan spam yang sesuai, serta
pengelolaan secret di server. Kumpulkan data secukupnya. Kebijakan privasi dan
analytics mengikuti kebutuhan serta cakupan pengguna; jangan menambahkan teks
kepatuhan hukum, pelacak, atau cookie banner yang tidak didukung implementasi.
Uji pengiriman memakai endpoint uji; pengiriman ke inbox produksi memerlukan
otorisasi yang sesuai.

## SEO dan performa

- Berikan title dan meta description yang menjelaskan setiap halaman. Pastikan
  konten utama dapat diakses crawler melalui rendering yang sesuai stack.
- Gunakan tautan internal dengan elemen anchor dan href yang benar. Untuk banyak
  halaman, periksa direct URL, refresh, dan navigasi antarhalaman.
- Gunakan heading dan teks deskriptif yang membantu pembaca; hindari keyword
  stuffing dan halaman layanan kosong.
- Tambahkan favicon dan metadata berbagi jika aset tersedia. URL absolut untuk
  canonical, Open Graph, sitemap, dan data terstruktur membutuhkan domain nyata;
  catat konfigurasi domain yang tertunda, jangan mengisi domain fiktif.
- Untuk situs yang dipublikasikan, sesuaikan robots dan sitemap dengan strategi
  indeks. Preview/draft tidak otomatis boleh diindeks.
- Structured data bersifat opsional dan hanya mencerminkan fakta terlihat yang
  benar. Jangan mengarang rating, ulasan, alamat, atau klaim organisasi.
- Optimalkan ukuran dan format gambar, sediakan dimensi, serta lazy-load gambar
  di bawah lipatan. Hindari lazy-loading gambar utama yang menghambat tampilan awal.
  Batasi font, script pihak ketiga, dan JavaScript sesuai kebutuhan.
- Gunakan hasil pengukuran ketika membahas performa. Jangan menjanjikan ranking,
  pengindeksan, atau skor Lighthouse tertentu tanpa pemeriksaan.

## Rujukan primer

Gunakan dokumentasi stack yang dipakai untuk API dan perilaku yang dapat berubah.
Rujukan standar ini dapat dibaca saat detail implementasi atau audit membutuhkannya:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Kontras teks](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Ukuran target](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Tautan yang dapat di-crawl](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
