import type {
  EmploymentType,
  FilterableCategory,
  JobRole,
  WorkMode,
} from './jobs';

export interface JobFilters {
  categories: FilterableCategory[];
  types: EmploymentType[];
  modes: WorkMode[];
}

export const emptyFilters: JobFilters = { categories: [], types: [], modes: [] };

export interface FilterCounts {
  category: Partial<Record<FilterableCategory, number>>;
  type: Partial<Record<EmploymentType, number>>;
  mode: Partial<Record<WorkMode, number>>;
}

/** Grup tanpa pilihan berarti tidak membatasi hasil. */
function matchesGroup(selected: readonly string[], value: string): boolean {
  return selected.length === 0 || selected.includes(value);
}

export function matchesFilters(job: JobRole, filters: JobFilters): boolean {
  return (
    matchesGroup(filters.categories, job.category) &&
    matchesGroup(filters.types, job.type) &&
    matchesGroup(filters.modes, job.mode)
  );
}

function countBy<K extends string>(
  jobs: readonly JobRole[],
  getKey: (job: JobRole) => K,
): Partial<Record<K, number>> {
  const result: Record<string, number> = {};
  for (const job of jobs) {
    const key = getKey(job);
    result[key] = (result[key] ?? 0) + 1;
  }
  return result as Partial<Record<K, number>>;
}

export function countJobs(jobs: readonly JobRole[]): FilterCounts {
  return {
    category: countBy(jobs, (job) => job.category),
    type: countBy(jobs, (job) => job.type),
    mode: countBy(jobs, (job) => job.mode),
  };
}