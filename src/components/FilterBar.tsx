import type { FilterableCategory } from '../data/jobs';

export type CategoryFilter = FilterableCategory | 'Semua';

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  options: readonly CategoryFilter[];
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
  counts: Record<CategoryFilter, number>;
}

export default function FilterBar({
  query,
  onQueryChange,
  options,
  active,
  onChange,
  counts,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <label htmlFor="job-search" className="sr-only">
          Cari posisi
        </label>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="job-search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari posisi, tim, atau skill, misalnya React"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-12 text-base outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Hapus pencarian"
            className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-ink focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
      </div>

      <div
        role="group"
        aria-label="Filter kategori"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {options.map((option) => {
          const isActive = option === active;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isActive
                  ? 'border-ink bg-ink text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-ink/50'
              }`}
            >
              {option}
              <span
                className={`rounded-full px-1.5 text-xs tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {counts[option]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}