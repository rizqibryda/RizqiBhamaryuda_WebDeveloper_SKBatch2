# Recruitment Landing Page Section

Mini assignment **Web Developer Intern (Product & Technology Division)** Batch 2, Sekolah Karir.

- **Nama kandidat:** Rizqi Bhamaryuda
- **Applicant ID:** SKR26-0296
- **Repository:** https://github.com/rizqibryda/skr26-0296

Satu section landing page recruitment yang responsif. Isinya headline, role cards yang bisa dicari dan difilter, modal detail dengan form lamaran, dan CTA.

## Tech stack

- React 19 dengan TypeScript (strict)
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`, tanpa `tailwind.config.js`)
- Inline SVG untuk ikon, tanpa library ikon
- Font: Inter dari Google Fonts, dengan fallback ke font bawaan device

## Cara menjalankan

Prasyarat: Node.js 20 atau lebih baru.

```bash
git clone https://github.com/rizqibryda/skr26-0296.git
cd skr26-0296
npm install
npm run dev
```

Buka `http://localhost:5173`.

Perintah lain:

```bash
npm run build     # type-check dan build produksi
npm run preview   # jalankan hasil build secara lokal
npm run lint      # ESLint
```

## Fitur

- Hero ringkas dengan headline dan CTA "Lihat posisi terbuka", sehingga daftar posisi langsung terlihat di layar pertama.
- 8 role cards dari mock data, lengkap dengan kategori, tipe kerja, lokasi, skill, dan tenggat.
- Pencarian berdasarkan judul, tim, atau skill.
- Filter multi-pilihan untuk kategori, tipe kerja, dan mode kerja, lengkap dengan indikator warna kategori, jumlah posisi per pilihan, chip filter aktif yang bisa dihapus satu per satu, dan tombol reset.
- Kondisi kosong yang menjelaskan masalahnya dan menyediakan tombol reset filter.
- Modal berisi detail posisi dan form lamaran dengan validasi, termasuk upload CV (PDF, maksimal 2 MB).
- CTA lamaran umum di bagian bawah untuk kandidat yang belum menemukan posisi yang cocok, diikuti catatan disclaimer simulasi (mock data).

## Struktur project

```
src/
├── components/
│   ├── RecruitmentSection.tsx   # section utama, memegang state filter dan modal
│   ├── FilterBar.tsx            # pencarian, dropdown filter, dan chip filter aktif
│   ├── MultiSelect.tsx          # dropdown multi-pilihan yang bisa dipakai ulang
│   ├── JobCard.tsx              # kartu satu lowongan
│   └── ApplyModal.tsx           # modal detail dan form lamaran
├── data/
│   ├── filters.ts               # tipe filter, logika pencocokan, dan penghitung
│   └── jobs.ts                  # tipe JobRole dan mock data
├── lib/
│   └── ui.ts                    # warna per kategori dan format tanggal
├── types/
│   └── index.ts                 # definisi tipe tambahan
├── App.tsx
├── index.css                    # Tailwind, design token, dan animasi
└── main.tsx
```

## Keputusan desain dan arsitektur

### Tujuan halaman

Halaman ini punya satu tugas: membantu kandidat menemukan posisi yang cocok, lalu melamar tanpa meninggalkan halaman. Semua keputusan di bawah mengikuti tujuan itu.

### Visual

- **Hero gelap, konten terang.** Hero navy dengan pola titik tipis memberi kesan buku catatan, bukan template SaaS. Hero sengaja dibuat ringkas dan tidak memenuhi layar, karena kandidat datang untuk melihat posisi, bukan membaca pengantar.
- **Kuning hanya untuk aksi utama.** Warna kuning dipakai pada tombol CTA utama dan penanda "Segera ditutup", sehingga mata langsung tahu apa yang harus diklik.
- **Warna kategori membawa informasi.** Titik indikator warna di dropdown filter dan chip aktif terhubung langsung dengan badge kategori pada kartu serta strip header di modal detail (Engineering, Design, Content, Growth, Data), sehingga pembedaan divisi konsisten dari kontrol filter hingga hasil kartu.
- **Satu font, hierarki lewat ukuran dan ketebalan.** Inter dipakai untuk judul dan isi karena sangat terbaca dan konsisten di semua device. Fallback ke font sistem menjaga tampilan tetap rapi jika font gagal dimuat. Panjang baris dibatasi agar nyaman dibaca.
- **Copy langsung ke intinya.** Tombol menyebut aksi yang terjadi ("Kirim lamaran"), pesan error menjelaskan cara memperbaikinya, dan kondisi kosong memberi jalan keluar.

### UX

- **Cari lalu filter lalu lihat detail lalu lamar** dalam satu halaman. Kandidat tidak perlu berpindah halaman atau kehilangan konteks daftar.
- **Filter berbentuk dropdown multi-pilihan, bukan deretan chip.** Dimensi seperti kategori bisa tumbuh jika perusahaan membuka lebih banyak bidang, dan deretan chip akan memenuhi layar. Dropdown tetap ringkas berapa pun jumlah opsinya. Kelemahannya, pilihan aktif tersembunyi di balik menu, jadi tombol menampilkan jumlah pilihan dan tiap filter aktif muncul sebagai chip yang bisa dihapus.
- **Jumlah hasil diumumkan ke screen reader** lewat `aria-live`, dan jumlah posisi per opsi terlihat di dalam dropdown sebelum dipilih.
- **Hanya filter yang membedakan kandidat secara nyata.** Tipe dan mode kerja dipilih karena paling relevan untuk calon intern. Lokasi, gaji, dan industri sengaja tidak ditambahkan karena dengan jumlah lowongan yang sedikit hanya akan menghasilkan hasil kosong.
- **Seluruh kartu bisa diklik, tapi hanya satu tombol di dalamnya.** Area klik besar memudahkan pengguna mobile maupun desktop, sementara pengguna keyboard dan screen reader hanya menemukan satu target fokus per kartu.
- **Form divalidasi saat submit.** Pesan error spesifik, dan fokus berpindah ke kolom pertama yang salah. CV wajib diunggah (PDF, maksimal 2 MB) dan divalidasi di sisi klien, sedangkan tautan portofolio bersifat opsional agar tidak menghalangi pelamar yang belum punya.
- **Lamaran umum ditempatkan setelah daftar posisi**, tepat saat kandidat selesai menelusuri dan belum menemukan yang cocok.
- **Gerakan hanya sebagai respons aksi tanpa layout shift:** kartu terangkat halus (`translateY`) dan panah bergeser saat hover tanpa mengubah tinggi baris di bawahnya, ada umpan balik sentuh saat diketuk di mobile, dan modal muncul saat dibuka. Tidak ada animasi otomatis yang berulang, dan `prefers-reduced-motion` dihormati.

### Responsivitas (mobile-first)

| Lebar | Layout |
|---|---|
| Mobile (< 640px) | Satu kolom dengan tombol CTA lebar penuh. Chip filter aktif membungkus rapi ke baris berikutnya. Modal tampil sebagai bottom sheet. |
| Tablet (`sm`, 640px ke atas) | Dua kolom kartu. Modal di tengah layar. |
| Desktop (`lg`, 1024px ke atas) | Tiga kolom kartu. Modal dua kolom: detail di kiri, form di kanan. |

### Arsitektur kode

- **Data terpisah dari tampilan.** Menambah atau mengubah lowongan cukup mengedit `src/data/jobs.ts`.
- **Satu pemilik state.** `RecruitmentSection` memegang state pencarian, filter, dan modal. `JobCard` dan `FilterBar` berbasis props, sehingga mudah dipahami dan diuji.
- **Turunan dihitung, bukan disimpan.** Daftar hasil filter dan jumlah per kategori dihitung dengan `useMemo` dari state yang ada, sehingga tidak ada state ganda yang bisa tidak sinkron.
- **`<dialog>` native untuk modal.** Focus trap, tombol Esc, dan backdrop ditangani browser, jadi tidak perlu library tambahan dan aksesibilitasnya lebih baik. Scroll halaman dikunci saat modal terbuka lewat CSS `:has()`.
- **TypeScript strict.** Kategori, tipe kerja, dan mode kerja memakai union type, bukan `enum`. Semua impor tipe memakai `import type`.
- **Class Tailwind ditulis utuh**, tidak dirangkai dari string, agar terdeteksi oleh scanner Tailwind v4.
- **Aksesibilitas dasar:** label pada semua input, `aria-invalid` dan `aria-describedby` pada error, indikator fokus yang jelas, dan hierarki heading yang runtut.

## Batasan

- Semua data lowongan adalah mock data. Tidak ada data pribadi atau data rahasia.
- Form lamaran hanya simulasi: validasi berjalan dan layar sukses muncul, tetapi tidak ada data, termasuk file CV, yang dikirim ke server.
- Belum ada backend, penyimpanan, atau pengujian otomatis.

## Pengembangan lanjutan (jika ada waktu)

- Menyimpan filter di URL agar bisa dibagikan.
- Menghubungkan form ke API atau layanan form.
- Menambah pengujian untuk fungsi filter dan validasi form.

## Referensi dan inspirasi

Pola filter ini terinspirasi dari pengamatan terhadap dua halaman lowongan yang saya buka pada 12 November 2026:

- **Karir BCA** (https://karir.bca.co.id): pencarian dan filter ditempatkan langsung di bagian atas halaman.
- **Dealls** (https://dealls.com): filter berbentuk dropdown dan pintasan satu ketukan untuk kebutuhan umum seperti fresh graduate dan kerja remote.

Keduanya melayani ratusan lowongan, jadi saya mengambil idenya tetapi menyederhanakannya: tanpa tombol "Cari" (hasil langsung berubah), hanya tiga filter yang relevan, dan label dropdown tidak terpotong. Ini hasil pengamatan saya sendiri, bukan hasil riset atau data pengguna.

Dokumentasi teknis yang saya gunakan: [MDN: elemen `<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) dan [dokumentasi Tailwind CSS](https://tailwindcss.com/docs).

## Catatan penggunaan AI

Saya menggunakan **Google Gemini** untuk menyusun draf awal komponen React, struktur mock data, dan kerangka dokumentasi README, lalu memanfaatkan **Claude** untuk menyempurnakan aspek user interface, user experience, serta detail interaksi komponennya. Saya kemudian membaca, menjalankan, menguji tampilan di berbagai lebar layar, dan memperbaiki hasilnya secara mandiri, termasuk menyelesaikan error tipe data maupun impor/ekspor selama proses integrasi. Saya memahami seluruh kode yang dikumpulkan dan siap menjelaskannya.