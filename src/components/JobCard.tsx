import type { JobRole } from '../data/jobs';
import { categoryStyles, formatDeadline } from '../lib/ui';

interface JobCardProps {
  job: JobRole;
  onSelect: (job: JobRole) => void;
}

export default function JobCard({ job, onSelect }: JobCardProps) {
  const style = categoryStyles[job.category];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-ink/40 hover:shadow-lg hover:shadow-ink/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600">
      <div
        aria-hidden="true"
        className={`h-1.5 transition-[height] duration-200 group-hover:h-2.5 ${style.bar}`}
      />

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
          >
            {job.category}
          </span>
          {job.isUrgent && (
            <span className="rounded-full bg-signal px-2.5 py-1 text-xs font-semibold text-ink">
              Segera ditutup
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
            {job.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{job.team}</p>
        </div>

        <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-slate-700">
          {job.summary}
        </p>

        <dl className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          <div>
            <dt className="sr-only">Tipe</dt>
            <dd>{job.type}</dd>
          </div>
          <div>
            <dt className="sr-only">Mode kerja</dt>
            <dd>{job.mode}</dd>
          </div>
          <div>
            <dt className="sr-only">Lokasi</dt>
            <dd>{job.location}</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5" aria-label="Skill yang dibutuhkan">
          {job.skills.slice(0, 3).map((skill) => (
            <li key={skill} className="rounded-md bg-paper px-2 py-1 text-xs text-slate-700">
              {skill}
            </li>
          ))}
          {job.skills.length > 3 && (
            <li className="px-1 py-1 text-xs text-slate-500">+{job.skills.length - 3} lagi</li>
          )}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          {job.deadline && (
            <p className="text-xs text-slate-500">
              Tutup <time dateTime={job.deadline}>{formatDeadline(job.deadline)}</time>
            </p>
          )}
          {/* after:inset-0 membuat seluruh kartu bisa diklik; tombol tetap satu-satunya target fokus */}
          <button
            type="button"
            onClick={() => onSelect(job)}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-ink outline-none after:absolute after:inset-0 after:content-['']"
          >
            Lihat detail
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 6 6 6-6 6" />
            </svg>
            <span className="sr-only">{`untuk ${job.title}`}</span>
          </button>
        </div>
      </div>
    </article>
  );
}