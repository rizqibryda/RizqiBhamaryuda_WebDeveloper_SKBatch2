import { useMemo, useState } from 'react';
import type { JobRole } from '../data/jobs';
import { filterCategories, jobRoles, openApplication } from '../data/jobs';
import ApplyModal from './ApplyModal';
import FilterBar from './FilterBar';
import type { CategoryFilter } from './FilterBar';
import JobCard from './JobCard';

const filterOptions: readonly CategoryFilter[] = ['Semua', ...filterCategories];
const teamCount = new Set(jobRoles.map((job) => job.team)).size;

function matchesQuery(job: JobRole, query: string): boolean {
  if (!query) return true;
  return [job.title, job.team, ...job.skills].some((text) =>
    text.toLowerCase().includes(query),
  );
}

export default function RecruitmentSection() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('Semua');
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);

  const counts = useMemo(() => {
    const result: Record<CategoryFilter, number> = {
      Semua: jobRoles.length,
      Engineering: 0,
      Design: 0,
      Content: 0,
      Growth: 0,
      Data: 0,
    };
    for (const job of jobRoles) {
      if (job.category !== 'Umum') result[job.category] += 1;
    }
    return result;
  }, []);

  const visibleJobs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return jobRoles.filter(
      (job) =>
        (category === 'Semua' || job.category === category) && matchesQuery(job, normalized),
    );
  }, [query, category]);

  const resetFilters = () => {
    setQuery('');
    setCategory('Semua');
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Hero */}
        <header
          className="rounded-3xl bg-ink px-6 py-12 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-24"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Bantu ribuan orang siap kerja, mulai dari karirmu sendiri.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Sekolah Karir mencari orang yang suka belajar dan ingin membangun produk yang
            berguna. Pilih posisi, baca detailnya, lalu lamar dalam dua menit.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#posisi"
              className="inline-flex items-center justify-center rounded-xl bg-signal px-6 py-3.5 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:translate-y-0"
            >
              Lihat posisi terbuka
            </a>
            <button
              type="button"
              onClick={() => setSelectedJob(openApplication)}
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Kirim lamaran umum
            </button>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            {jobRoles.length} posisi terbuka di {teamCount} tim.
          </p>
        </header>

        {/* Daftar posisi */}
        <section id="posisi" aria-labelledby="posisi-heading" className="scroll-mt-6 py-12 sm:py-16">
          <div className="mb-6 sm:mb-8">
            <h2
              id="posisi-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Posisi terbuka
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Magang, part-time, dan full-time. Kebanyakan bisa dikerjakan dari mana saja.
            </p>
          </div>

          <FilterBar
            query={query}
            onQueryChange={setQuery}
            options={filterOptions}
            active={category}
            onChange={setCategory}
            counts={counts}
          />

          <p aria-live="polite" className="mb-4 mt-6 text-sm text-slate-500">
            Menampilkan {visibleJobs.length} dari {jobRoles.length} posisi
          </p>

          {visibleJobs.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {visibleJobs.map((job) => (
                <JobCard key={job.id} job={job} onSelect={setSelectedJob} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <h3 className="font-display text-xl font-semibold">Tidak ada posisi yang cocok</h3>
              <p className="mx-auto mt-2 max-w-sm text-slate-600">
                Coba kata kunci lain atau tampilkan semua kategori.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Reset filter
              </button>
            </div>
          )}
        </section>

        {/* CTA penutup */}
        <aside className="mb-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-signal p-8 sm:flex-row sm:items-center sm:p-12">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Belum ada posisi yang cocok?
            </h2>
            <p className="mt-2 text-ink/80">
              Perkenalkan dirimu. Kami simpan profilmu dan menghubungi kamu saat ada posisi
              yang sesuai.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedJob(openApplication)}
            className="shrink-0 rounded-xl bg-ink px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Kirim lamaran umum
          </button>
        </aside>
      </div>

      {selectedJob && (
        <ApplyModal
          key={selectedJob.id}
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
}