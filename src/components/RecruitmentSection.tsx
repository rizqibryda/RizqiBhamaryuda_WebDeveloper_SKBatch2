import { useMemo, useState } from 'react';
import type { JobRole } from '../data/jobs';
import { jobRoles, openApplication } from '../data/jobs';
import { countJobs, emptyFilters, matchesFilters } from '../data/filters';
import type { JobFilters } from '../data/filters';
import ApplyModal from './ApplyModal';
import FilterBar from './FilterBar';
import JobCard from './JobCard';

const teamCount = new Set(jobRoles.map((job) => job.team)).size;
const filterCounts = countJobs(jobRoles);

function matchesQuery(job: JobRole, query: string): boolean {
  if (!query) return true;
  return [job.title, job.team, ...job.skills].some((text) =>
    text.toLowerCase().includes(query),
  );
}

export default function RecruitmentSection() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<JobFilters>(emptyFilters);
  const [selectedJob, setSelectedJob] = useState<JobRole | null>(null);

  const visibleJobs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return jobRoles.filter(
      (job) => matchesFilters(job, filters) && matchesQuery(job, normalized),
    );
  }, [query, filters]);

  const resetFilters = () => {
    setQuery('');
    setFilters(emptyFilters);
  };

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Hero: sengaja ringkas agar daftar posisi langsung terlihat */}
        <header
          className="rounded-3xl bg-ink px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-signal">
                {jobRoles.length} posisi terbuka di {teamCount} tim
              </p>
              <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Bantu ribuan orang siap kerja, mulai dari karirmu sendiri.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Pilih posisi, baca detailnya, lalu lamar dalam dua menit.
              </p>
            </div>
            <a
              href="#posisi"
              className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-signal px-6 py-3.5 text-base font-semibold text-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-signal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hover:translate-y-0 lg:w-auto"
            >
              Lihat posisi terbuka
            </a>
          </div>
        </header>

        {/* Daftar posisi */}
        <section id="posisi" aria-labelledby="posisi-heading" className="scroll-mt-6 py-8 sm:py-12">
          <div className="mb-6 sm:mb-8">
            <h2
              id="posisi-heading"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Posisi terbuka
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Magang, part-time, dan full-time. Kebanyakan bisa dikerjakan dari mana saja.
            </p>
          </div>

          <FilterBar
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
            counts={filterCounts}
            onReset={resetFilters}
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
                Coba kata kunci lain atau hapus sebagian filter.
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
            className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-ink px-6 py-3.5 text-base font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:hover:translate-y-0 sm:w-auto"
          >
            Kirim lamaran umum
          </button>
        </aside>

        {/* Disclaimer mini assignment */}
        <footer className="border-t border-slate-200 py-6 text-center text-xs leading-relaxed text-slate-500">
          <p className="text-balance">
            Mini assignment seleksi{' '}
            <span className="font-medium text-ink">Web Developer Intern</span> —{' '}
            <span className="whitespace-nowrap font-medium text-ink">Sekolah Karir</span>{' '}
            <span className="whitespace-nowrap">(Rizqi Bhamaryuda · SKR26-0296)</span>
          </p>
          <p className="mt-1 text-balance text-slate-400">
            Seluruh daftar posisi dan form lamaran pada halaman ini bersifat simulasi (mock data).
          </p>
        </footer>
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