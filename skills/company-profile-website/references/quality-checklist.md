# Pemeriksaan dan serah terima

Sesuaikan pemeriksaan dengan perubahan. Untuk revisi satu bagian, uji bagian itu
dan interaksi yang terdampak; tidak perlu mengulang seluruh alur tanpa alasan.
Untuk website baru, periksa seluruh halaman dan jalur utama yang dibuat.

Catat tiap pemeriksaan sebagai lulus, perlu perbaikan, tidak berlaku, atau belum
diverifikasi. Sertakan bukti ringkas seperti perintah, viewport, route, atau perilaku
yang diamati. Jangan menyamakan telaah kode dengan pengujian browser.

## Kesesuaian dengan brief

Gunakan permintaan pengguna terbaru dan brief/spesifikasi yang masih berlaku
sebagai acuan. Untuk tiap kebutuhan material dalam cakupan, periksa hasil yang
dilihat pengunjung dan bukti pemenuhannya. Pada revisi kecil, cukup nilai bagian
yang berubah beserta dampaknya; kelulusan build tidak menutup kebutuhan yang
masih hilang atau salah. Pemeriksaan ini mencakup:

- Pengunjung dapat menemukan bidang usaha, layanan, target pelanggan, dan kontak.
- Setiap klaim material memiliki sumber dari pengguna atau rujukan yang sesuai.
- Portofolio menjelaskan peran perusahaan; data contoh dan proyek konseptual
  diberi label. Tidak ada logo klien, testimoni, atau angka buatan.
- Konten, istilah, CTA, dan kontak konsisten antarhalaman dan bahasa.
- Placeholder draft tidak diperlakukan sebagai konten siap publikasi. Daftar data
  yang belum tersedia berada dalam catatan serah terima.
- Struktur, bahasa, pesan, dan tindakan utama mengikuti acuan. Fitur tambahan
  yang mengubah cakupan dibahas terhadap permintaan pengguna.
- Kriteria penerimaan yang relevan memiliki bukti. Jika kanal kontak atau fitur
  wajib belum aktif, kebutuhan itu tetap belum terpenuhi walaupun layout selesai.

## Kualitas teknis

Periksa implementasi sesuai stack, konvensi proyek, serta perubahan yang dibuat.
Pemeriksaan berikut terpisah dari penilaian kesesuaian dengan brief.

### Build dan perilaku

- Jalankan build, lint, atau typecheck yang relevan jika disediakan proyek.
- Buka halaman utama dan route lain melalui preview bila alat browser tersedia.
  Periksa direct URL dan refresh untuk situs dengan beberapa halaman.
- Periksa navigasi, menu mobile, anchor, tombol, filter portofolio, dan pergantian
  bahasa yang benar-benar dibuat. Tidak ada kontrol yang menjanjikan aksi kosong.
- Periksa URL kontak dan encoding; jangan mengirim pesan nyata tanpa otorisasi.
- Untuk formulir: uji input tidak valid, loading, kegagalan jaringan, keberhasilan
  endpoint uji, dan pencegahan pengiriman berulang jika relevan. Pastikan UI tidak
  mengatakan terkirim jika hanya melakukan simulasi.
- Periksa asset hilang, tautan rusak, error console dan request yang gagal.

### Tampilan dan aksesibilitas

- Inspeksi mobile sempit, tablet bila layout berubah, dan desktop. Contoh viewport
  praktis: 375, 768, dan 1440 CSS px; tambah 320 px untuk reflow dan titik yang
  menunjukkan masalah. Lebar ini pilihan uji, bukan bukti lengkap standar.
- Periksa keterbacaan, hierarki, pemotongan teks/gambar, overflow, dan elemen tetap
  yang menutupi konten. Coba pembesaran teks dan reduced motion bila relevan.
- Telusuri jalur utama dengan keyboard: urutan fokus, fokus terlihat, menu/modal,
  tombol, dan formulir. Periksa nama kontrol, heading, landmark, alt, dan label.
- Ukur kontras pasangan warna yang digunakan, termasuk teks di atas gambar.
- Gunakan audit otomatis yang tersedia untuk membantu menemukan masalah;
  perbaiki temuan yang relevan dan tetap lakukan pemeriksaan manual.

### SEO, performa, dan kesiapan publikasi

- Periksa title, description, bahasa dokumen, internal links, serta konten yang
  dapat diakses sesuai rendering stack. Periksa metadata berbagi jika dibuat.
- Verifikasi canonical, sitemap, robots, dan structured data bila diterapkan.
  Domain yang belum tersedia adalah pekerjaan konfigurasi tertunda.
- Periksa berat gambar, dimensi, font, dan script. Laporkan skor/metrik hanya jika
  diukur, beserta kondisi pengukurannya. Jangan memakai skor sebagai sertifikasi.
- Jika publikasi termasuk permintaan, verifikasi konfigurasi domain, route dan
  HTTPS melalui alat yang tersedia sesudah deployment. Jika tidak termasuk,
  serahkan preview dan instruksi yang sesuai tanpa melakukan publikasi sendiri.

## Serah terima

Laporkan hasil kesesuaian dengan brief dan kualitas teknis secara terpisah.
Gunakan paragraf singkat untuk tugas kecil, atau tabel ketika banyak kebutuhan
perlu ditelusuri. Pada tiap sisi, sebutkan temuan yang belum selesai serta batas
verifikasi; kelulusan satu sisi tidak otomatis meluluskan sisi lainnya.

Berikan lokasi kode atau URL preview, cara menjalankan, tempat mengubah layanan,
portofolio dan kontak, keputusan utama, serta pemeriksaan yang dilakukan. Jelaskan
mana yang masih berupa draft, integrasi yang belum aktif, dan pekerjaan sebelum
publikasi. Jika build/browser tidak tersedia, tuliskan keterbatasan spesifik dan
pemeriksaan yang masih diperlukan; tetap serahkan pekerjaan yang selesai.

Hindari klaim "sesuai seluruh WCAG", "aman sepenuhnya", "SEO terjamin", atau
"siap produksi" jika bukti dan cakupan pemeriksaan tidak mendukungnya.
