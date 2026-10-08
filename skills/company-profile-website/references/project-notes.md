# Spesifikasi dan kelanjutan proyek

Gunakan hanya bagian yang sesuai kebutuhan website company profile. Dokumen
dibuat di proyek website pengguna; folder skill berisi panduan yang dapat dipakai
ulang, bukan data perusahaan tertentu. Ikuti lokasi dokumen yang sudah ada.

## Spesifikasi singkat

Gunakan ketika website baru atau cakupan kompleks membutuhkan acuan yang belum
tersedia, atau pengguna meminta spesifikasi. Jika brief atau dokumen yang ada
sudah menjelaskan keputusan dan hasil yang diharapkan, jadikan itu acuan langsung.
Revisi kecil cukup memakai permintaan pengguna dan konteks yang relevan.

Untuk spesifikasi baru, gunakan lokasi seperti `docs/company-profile/spec.md`
bila proyek belum memiliki konvensi. Isi dari percakapan dan bahan yang tersedia:

- **Tujuan dan pembaca:** kebutuhan bisnis serta tindakan utama pengunjung.
- **Cakupan:** halaman atau bagian yang dibuat/diubah, isi utamanya, dan fitur yang
  diminta. Catat hal di luar cakupan hanya jika perlu menjelaskan batas pekerjaan.
- **Keputusan:** bahasa, struktur, arah visual, teknologi, dan jalur kontak sejauh
  relevan. Bedakan keputusan pengguna dari asumsi yang masih terbuka.
- **Kriteria penerimaan:** perilaku atau informasi yang dapat diperiksa. Misalnya,
  pengunjung dapat menemukan layanan utama, memahami lingkupnya, melihat bukti
  yang tersedia, dan membuka kanal kontak yang benar pada tampilan mobile.
- **Bahan dan kekurangan:** rujukan konten/aset, status fakta, serta data atau
  integrasi yang masih dibutuhkan. Jelaskan mana yang menghambat fitur wajib.

Sesuaikan panjang dengan pekerjaan. Setiap kebutuhan material harus memiliki
hasil yang dapat diperiksa; jangan menciptakan fitur agar spesifikasi tampak lengkap.
Perbarui bagian yang berubah setelah keputusan pengguna, tanpa mengulang
wawancara ketika informasi sudah cukup. Instruksi pengguna yang lebih baru
mengubah acuan lama. Permintaan membuat website mengizinkan penyusunan acuan
yang diperlukan; persetujuan tiap tahap bukan syarat otomatis.

Spesifikasi cukup ketika lingkup, keputusan yang diperlukan, dan kriteria
penerimaan dapat memandu implementasi serta QA. Rujuk bahan yang sudah ada
melalui path relatif proyek atau URL; hindari menyalin seluruh dokumen sumber.

## Catatan kelanjutan

Gunakan ketika pekerjaan panjang membutuhkan ingatan yang tersimpan, akan
dilanjutkan pada sesi berikutnya, atau dipindahkan ke provider lain. Untuk tugas
singkat yang selesai, ringkasan akhir cukup. Catatan mencatat keadaan saat ini;
tidak menambah tujuan baru atau menggantikan pekerjaan implementasi yang diminta.

Perbarui catatan proyek yang sudah ada. Bila belum ada konvensi, gunakan lokasi
seperti `docs/company-profile/handoff.md`. Catat seperlunya:

- Tujuan aktif, batas pekerjaan, dan rujukan brief/spesifikasi.
- Keputusan terbaru beserta asumsi atau pertanyaan yang masih terbuka.
- Bagian yang selesai, sedang dikerjakan, atau belum selesai; tunjukkan file,
  halaman, dan aset yang relevan melalui path relatif proyek.
- Cara menjalankan/preview serta pemeriksaan yang benar-benar dilakukan dan
  hasilnya. Bedakan pemeriksaan gagal dari yang belum dijalankan.
- Langkah berikutnya dan data, akses, atau integrasi yang diperlukan untuknya.

Simpan fakta proyek dan rujukan yang berguna lintas provider. Nama tool sesi,
ID sementara, serta path mesin yang tidak berlaku di lingkungan berikutnya tidak
menjadi ketergantungan. Rahasia seperti password, API key, dan data pelanggan
pribadi tidak dimasukkan ke catatan; rujuk lokasi konfigurasi tanpa nilainya.

Catatan cukup ketika agent berikutnya dapat menemukan acuan, memahami status
dan batasnya, serta memilih langkah berikutnya tanpa menebak keputusan lama.
Saat melanjutkan, baca rujukan yang relevan dan periksa keadaan kode saat ini;
selesaikan perbedaan dengan instruksi pengguna terbaru. Gunakan acuan yang
sama untuk QA dan perbarui status setelah pekerjaan berubah.
