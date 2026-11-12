import { useEffect, useId, useRef, useState } from 'react';

interface MultiSelectProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: readonly T[];
  counts?: Partial<Record<T, number>>;
  dots?: Partial<Record<T, string>>;
  onChange: (next: T[]) => void;
}

export default function MultiSelect<T extends string>({
  label,
  options,
  selected,
  counts,
  dots,
  onChange,
}: MultiSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const isActive = selected.length > 0;

  // Tutup saat klik di luar atau menekan Esc.
  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const toggle = (option: T) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    );
  };

  return (
    // Di mobile panel dilebarkan mengikuti baris filter, di sm ke atas menempel pada tombolnya.
    <div ref={rootRef} className="sm:relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
          isActive
            ? 'border-ink bg-white text-ink'
            : 'border-slate-300 bg-white text-slate-700 hover:border-ink/50'
        }`}
      >
        {label}
        {isActive && (
          <span className="rounded-full bg-ink px-1.5 text-xs tabular-nums text-white">
            {selected.length}
          </span>
        )}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`size-4 transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          id={panelId}
          role="group"
          aria-label={`Filter ${label}`}
          className="absolute inset-x-0 z-20 mt-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-ink/10 sm:inset-x-auto sm:left-0 sm:w-64"
        >
          <ul>
            {options.map((option) => (
              <li key={option}>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => toggle(option)}
                    className="size-4 accent-ink"
                  />
                  {dots?.[option] && (
                    <span
                      aria-hidden="true"
                      className={`size-2 shrink-0 rounded-full ${dots[option]}`}
                    />
                  )}
                  <span className="flex-1">{option}</span>
                  <span className="text-xs tabular-nums text-slate-500">
                    {counts?.[option] ?? 0}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {isActive && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-blue-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              Hapus pilihan
            </button>
          )}
        </div>
      )}
    </div>
  );
}