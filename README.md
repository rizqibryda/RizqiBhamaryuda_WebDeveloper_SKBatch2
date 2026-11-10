# Recruitment Landing Page Section — Sekolah Karir Technical Test

Dokumentasi ini disusun untuk memenuhi *technical assignment* seleksi magang **Web Developer (Product & Technology Division)** Batch 2 di Sekolah Karir.

## 👤 Informasi Kandidat
- **Nama Kandidat**: Rizqi Bhamaryuda
- **Applicant ID**: SKR26-0296
- **Posisi**: Web Developer Intern (Product & Technology Division)

---

## 🛠️ Tech Stack & Alat Pengembangan
- **Framework & UI Library**: React.js (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Iconography**: Inline SVG (Lightweight & Clean)

---

## 🏗️ Keputusan Arsitektur & Desain Utama

1. **Component-Driven Architecture**:
   - `JobCard.tsx`: Komponen atomik terpisah untuk kartu lowongan kerja agar mudah digunakan kembali (*reusable*) dan dapat diuji secara independen.
   - `RecruitmentSection.tsx`: Komponen *section* utama yang menggabungkan Headline, Grid Layout, dan Call-to-Action (CTA).

2. **Type Safety & Data Separation**:
   - Struktur data lowongan kerja disatukan dengan tipe TypeScript (`JobRole`) di `src/data/jobs.ts` untuk menjaga konsistensi tipe dan keterbacaan kode (*clean code*).

3. **Mobile-First & Responsive Layout**:
   - Menggunakan CSS Grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) untuk memastikan tampilan *usable* dan rapi di layar *mobile*, *tablet*, hingga *desktop* tanpa mengorbankan hierarki visual.

4. **Modern Utility-First Styling (Tailwind v4)**:
   - Memanfaatkan fitur Tailwind CSS v4 via `@tailwindcss/vite` untuk performa *build* yang cepat dan mempertahankan *clean minimalism* serta efek *glassmorphism* (`backdrop-blur`).

---

## 🚀 Cara Menjalankan Project Secara Lokal

1. **Clone repository ini**:
   ```bash
   git clone [https://github.com/rizqibryda/skr26-0296.git](https://github.com/rizqibryda/skr26-0296.git)
   cd skr26-0296