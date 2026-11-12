import type { JobCategory } from '../data/jobs';

interface CategoryStyle {
  /** Warna strip di sisi atas kartu. */
  bar: string;
  /** Warna badge kategori. */
  badge: string;
}

// Class ditulis lengkap agar terdeteksi oleh Tailwind v4.
export const categoryStyles: Record<JobCategory, CategoryStyle> = {
  Engineering: { bar: 'bg-blue-600', badge: 'bg-blue-50 text-blue-800 ring-blue-200' },
  Design: { bar: 'bg-violet-600', badge: 'bg-violet-50 text-violet-800 ring-violet-200' },
  Content: { bar: 'bg-emerald-600', badge: 'bg-emerald-50 text-emerald-800 ring-emerald-200' },
  Growth: { bar: 'bg-orange-500', badge: 'bg-orange-50 text-orange-800 ring-orange-200' },
  Data: { bar: 'bg-cyan-600', badge: 'bg-cyan-50 text-cyan-800 ring-cyan-200' },
  Umum: { bar: 'bg-slate-500', badge: 'bg-slate-100 text-slate-700 ring-slate-200' },
};

export function formatDeadline(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}