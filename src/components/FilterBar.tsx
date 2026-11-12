import type { JobCategory } from '../data/jobs';
import { employmentTypes, filterCategories, workModes } from '../data/jobs';
import type { FilterCounts, JobFilters } from '../data/filters';
import { categoryStyles } from '../lib/ui';
import MultiSelect from './MultiSelect';

interface FilterBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  counts: FilterCounts;
  onReset: () => void;
}

interface ActiveChip {
  key: string;
  label: string;
  dot?: string;
  onRemove: () => void;
}

const categoryDots: Partial<Record<JobCategory, string>> = {
  Engineering: categoryStyles.Engineering.dot,
  Design: categoryStyles.Design.dot,
  Content: categoryStyles.Content.dot,
  Growth: categoryStyles.Growth.dot,
  Data: categoryStyles.Data.dot,
};

export default function FilterBar({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  counts,
  onReset,
}: FilterBarProps) {
  const activeChips: ActiveChip[] = [
    ...filters.categories.map((value) => ({
      key: `category-${value}`,
      label: value,
      dot: categoryStyles[value].dot,
      onRemove: () =>
        onFiltersChange({
          ...filters,
          categories: filters.categories.filter((item) => item !== value),
        }),
    })),
    ...filters.types.map((value) => ({
      key: `type-${value}`,
      label: value,
      onRemove: () =>
        onFiltersChange({ ...filters, types: filters.types.filter((item) => item !== value) }),
    })),
    ...filters.modes.map((value) => ({
      key: `mode-${value}`,
      label: value,
      onRemove: () =>
        onFiltersChange({ ...filters, modes: filters.modes.filter((item) => item !== value) }),
    })),
  ];
  const canReset = activeChips.length > 0 || query.trim() !== '';

  return (
    <div className="flex flex-col gap-3">
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

      <div className="relative flex flex-wrap items-center gap-2">
        <MultiSelect
          label="Kategori"
          options={filterCategories}
          selected={filters.categories}
          counts={counts.category}
          dots={categoryDots}
          onChange={(categories) => onFiltersChange({ ...filters, categories })}
        />
        <MultiSelect
          label="Tipe"
          options={employmentTypes}
          selected={filters.types}
          counts={counts.type}
          onChange={(types) => onFiltersChange({ ...filters, types })}
        />
        <MultiSelect
          label="Mode kerja"
          options={workModes}
          selected={filters.modes}
          counts={counts.mode}
          onChange={(modes) => onFiltersChange({ ...filters, modes })}
        />
        {canReset && (
          <button
            type="button"
            onClick={onReset}
            className="h-11 rounded-xl px-3 text-sm font-medium text-blue-700 hover:bg-white focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            Reset semua
          </button>
        )}
      </div>

      {activeChips.length > 0 && (
        <ul aria-label="Filter aktif" className="flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <li key={chip.key}>
              <button
                type="button"
                onClick={chip.onRemove}
                aria-label={`Hapus filter ${chip.label}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {chip.dot && (
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full ring-1 ring-white/50 ${chip.dot}`}
                  />
                )}
                {chip.label}
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}