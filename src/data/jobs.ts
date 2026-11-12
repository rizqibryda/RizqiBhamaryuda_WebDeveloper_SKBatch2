export type JobCategory =
  | 'Engineering'
  | 'Design'
  | 'Content'
  | 'Growth'
  | 'Data'
  | 'Umum';

/** Kategori yang tampil sebagai filter (lamaran umum tidak difilter). */
export type FilterableCategory = Exclude<JobCategory, 'Umum'>;

export type EmploymentType = 'Magang' | 'Part-time' | 'Full-time';
export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';

export interface JobRole {
  id: string;
  title: string;
  team: string;
  category: JobCategory;
  type: EmploymentType;
  mode: WorkMode;
  location: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  /** Format ISO: YYYY-MM-DD. Kosongkan jika dibuka sepanjang waktu. */
  deadline?: string;
  isUrgent?: boolean;
}

export const filterCategories: readonly FilterableCategory[] = [
  'Engineering',
  'Design',
  'Content',
  'Growth',
  'Data',
];

// Seluruh data di bawah adalah mock data.
export const jobRoles: JobRole[] = [
  {
    id: 'frontend-developer-intern',
    title: 'Frontend Developer Intern',
    team: 'Tim Produk',
    category: 'Engineering',
    type: 'Magang',
    mode: 'Hybrid',
    location: 'Jakarta',
    summary:
      'Bangun antarmuka platform belajar yang dipakai ribuan peserta setiap hari, dari halaman kelas sampai dashboard progres.',
    responsibilities: [
      'Membuat komponen UI yang responsif dengan React dan TypeScript.',
      'Mengubah desain Figma menjadi halaman yang rapi di mobile dan desktop.',
      'Ikut code review dan menulis perbaikan bug yang kamu temukan sendiri.',
    ],
    requirements: [
      'Paham HTML, CSS, dan JavaScript modern.',
      'Pernah membuat minimal satu proyek web, boleh proyek kuliah.',
      'Terbiasa memakai Git dan mau belajar dari feedback.',
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
    deadline: '2026-12-05',
  },
  {
    id: 'backend-developer-intern',
    title: 'Backend Developer Intern',
    team: 'Tim Produk',
    category: 'Engineering',
    type: 'Magang',
    mode: 'Remote',
    location: 'Seluruh Indonesia',
    summary:
      'Kembangkan API dan layanan di balik fitur pendaftaran, pembayaran, dan sertifikat peserta.',
    responsibilities: [
      'Membuat dan merawat endpoint REST untuk fitur baru.',
      'Menulis query dan migrasi database yang aman.',
      'Menambahkan test agar fitur tidak rusak saat diubah.',
    ],
    requirements: [
      'Menguasai satu bahasa backend, misalnya Node.js, Go, atau PHP.',
      'Paham dasar SQL dan konsep REST API.',
      'Bisa menjelaskan keputusan teknis dengan bahasa sederhana.',
    ],
    skills: ['Node.js', 'PostgreSQL', 'REST API', 'Testing'],
    deadline: '2026-12-05',
  },
  {
    id: 'ux-designer-intern',
    title: 'UI/UX Designer Intern',
    team: 'Tim Desain',
    category: 'Design',
    type: 'Magang',
    mode: 'Hybrid',
    location: 'Jakarta',
    summary:
      'Rancang pengalaman belajar yang mudah dipahami, mulai dari riset singkat bersama peserta sampai prototipe yang siap dikembangkan.',
    responsibilities: [
      'Membuat wireframe dan prototipe di Figma.',
      'Ikut sesi wawancara pengguna dan merangkum temuannya.',
      'Menjaga konsistensi komponen di design system.',
    ],
    requirements: [
      'Punya portofolio dengan minimal dua studi kasus.',
      'Paham prinsip aksesibilitas dasar, seperti kontras dan ukuran sentuh.',
      'Mampu mempresentasikan alasan di balik keputusan desain.',
    ],
    skills: ['Figma', 'User research', 'Prototyping'],
    deadline: '2026-11-27',
    isUrgent: true,
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    team: 'Tim Konten',
    category: 'Content',
    type: 'Part-time',
    mode: 'Remote',
    location: 'Seluruh Indonesia',
    summary:
      'Tulis artikel, panduan, dan email yang membantu pencari kerja memahami dunia karir dengan bahasa yang jelas.',
    responsibilities: [
      'Menulis 3 sampai 4 artikel per minggu tentang karir dan skill kerja.',
      'Mengedit naskah dari narasumber agar mudah dibaca.',
      'Mengoptimalkan artikel lama berdasarkan data pembaca.',
    ],
    requirements: [
      'Tulisan runtut, bebas typo, dan tidak bertele-tele.',
      'Paham dasar SEO.',
      'Menyertakan 2 sampel tulisan saat melamar.',
    ],
    skills: ['Copywriting', 'SEO', 'Editing'],
    deadline: '2026-12-10',
  },
  {
    id: 'learning-experience-designer',
    title: 'Learning Experience Designer',
    team: 'Tim Akademik',
    category: 'Content',
    type: 'Full-time',
    mode: 'Hybrid',
    location: 'Jakarta',
    summary:
      'Susun kurikulum dan latihan praktik bersama mentor industri supaya peserta benar-benar siap kerja setelah kelas selesai.',
    responsibilities: [
      'Memetakan tujuan belajar untuk tiap kelas.',
      'Menyusun modul, studi kasus, dan rubrik penilaian.',
      'Mengukur hasil belajar peserta dan memperbaiki materi.',
    ],
    requirements: [
      'Pengalaman 1 tahun atau lebih di bidang pendidikan atau pelatihan.',
      'Terbiasa bekerja dengan praktisi dari berbagai bidang.',
      'Mampu menyederhanakan topik yang rumit.',
    ],
    skills: ['Instructional design', 'Kurikulum', 'Evaluasi belajar'],
    deadline: '2026-12-20',
  },
  {
    id: 'growth-marketing-intern',
    title: 'Growth Marketing Intern',
    team: 'Tim Growth',
    category: 'Growth',
    type: 'Magang',
    mode: 'Hybrid',
    location: 'Bandung',
    summary:
      'Jalankan eksperimen kampanye untuk menjangkau lebih banyak peserta, lalu pelajari mana yang paling berhasil.',
    responsibilities: [
      'Menyiapkan dan memantau kampanye di media sosial dan email.',
      'Mencatat hasil eksperimen di laporan mingguan.',
      'Membantu menyusun brief konten untuk tim desain.',
    ],
    requirements: [
      'Tertarik pada pemasaran digital dan angka.',
      'Bisa memakai spreadsheet untuk merangkum data.',
      'Aktif mengikuti tren platform sosial.',
    ],
    skills: ['Social media', 'Email marketing', 'Spreadsheet'],
    deadline: '2026-11-30',
    isUrgent: true,
  },
  {
    id: 'community-associate',
    title: 'Community Associate',
    team: 'Tim Komunitas',
    category: 'Growth',
    type: 'Part-time',
    mode: 'Remote',
    location: 'Seluruh Indonesia',
    summary:
      'Temani alumni dan peserta aktif di komunitas, jawab pertanyaan mereka, dan hidupkan diskusi yang berguna.',
    responsibilities: [
      'Menjawab pertanyaan peserta di Discord dan WhatsApp.',
      'Menjadwalkan sesi sharing bulanan bersama alumni.',
      'Merangkum masukan komunitas untuk tim produk.',
    ],
    requirements: [
      'Komunikatif, sabar, dan ramah.',
      'Bisa meluangkan 20 jam per minggu.',
      'Pengalaman mengelola komunitas atau organisasi menjadi nilai tambah.',
    ],
    skills: ['Community management', 'Komunikasi', 'Moderasi'],
    deadline: '2026-12-12',
  },
  {
    id: 'data-analyst-intern',
    title: 'Data Analyst Intern',
    team: 'Tim Data',
    category: 'Data',
    type: 'Magang',
    mode: 'Remote',
    location: 'Seluruh Indonesia',
    summary:
      'Gali data belajar peserta untuk menemukan di mana mereka tersendat, lalu ubah temuannya menjadi rekomendasi yang jelas.',
    responsibilities: [
      'Menulis query SQL untuk laporan mingguan.',
      'Membuat dashboard yang mudah dibaca tim non-teknis.',
      'Menyajikan temuan dalam presentasi singkat.',
    ],
    requirements: [
      'Menguasai SQL dasar dan salah satu alat visualisasi.',
      'Teliti dalam memeriksa kualitas data.',
      'Terbiasa bekerja dengan data publik atau data contoh.',
    ],
    skills: ['SQL', 'Looker Studio', 'Python', 'Storytelling'],
    deadline: '2026-12-08',
  },
];

/** Dipakai oleh CTA "Kirim lamaran umum". */
export const openApplication: JobRole = {
  id: 'open-application',
  title: 'Lamaran umum',
  team: 'Semua tim',
  category: 'Umum',
  type: 'Magang',
  mode: 'Hybrid',
  location: 'Fleksibel',
  summary:
    'Belum ada posisi yang cocok? Perkenalkan dirimu. Kami simpan profilmu dan menghubungi kamu saat ada posisi yang sesuai.',
  responsibilities: [],
  requirements: [
    'Jelaskan bidang yang kamu minati dan skill utama kamu.',
    'Sertakan tautan portofolio, GitHub, atau LinkedIn jika ada.',
  ],
  skills: [],
};