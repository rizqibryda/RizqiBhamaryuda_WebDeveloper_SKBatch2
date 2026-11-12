import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { JobRole } from '../data/jobs';
import { categoryStyles, formatDeadline } from '../lib/ui';

interface ApplyModalProps {
  job: JobRole;
  onClose: () => void;
}

interface FormValues {
  name: string;
  email: string;
  portfolio: string;
  motivation: string;
}

type TextFieldName = keyof FormValues;
type FieldName = TextFieldName | 'cv';
type FormErrors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'success';

const initialValues: FormValues = { name: '', email: '', portfolio: '', motivation: '' };

const MAX_CV_SIZE_MB = 2;
const MAX_CV_BYTES = MAX_CV_SIZE_MB * 1024 * 1024;

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validate(values: FormValues, cv: File | null): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = 'Tulis nama lengkap kamu.';
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Masukkan email yang valid, misalnya nama@email.com.';
  }
  if (!cv) {
    errors.cv = 'Unggah CV kamu dalam format PDF.';
  } else if (cv.type !== 'application/pdf' && !cv.name.toLowerCase().endsWith('.pdf')) {
    errors.cv = 'CV harus berupa file PDF.';
  } else if (cv.size > MAX_CV_BYTES) {
    errors.cv = `Ukuran CV maksimal ${MAX_CV_SIZE_MB} MB.`;
  }
  if (values.portfolio.trim() && !isValidUrl(values.portfolio.trim())) {
    errors.portfolio = 'Tautan harus diawali http:// atau https://.';
  }
  if (values.motivation.trim().length < 30) {
    errors.motivation = 'Ceritakan minimal 30 karakter tentang alasan kamu melamar.';
  }
  return errors;
}

interface TextFieldProps {
  idPrefix: string;
  name: TextFieldName;
  label: string;
  value: string;
  error?: string;
  optional?: boolean;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (name: TextFieldName, value: string) => void;
}

function TextField({
  idPrefix,
  name,
  label,
  value,
  error,
  optional,
  multiline,
  type = 'text',
  placeholder,
  autoComplete,
  onChange,
}: TextFieldProps) {
  const id = `${idPrefix}-${name}`;
  const errorId = `${id}-error`;
  const className = `w-full rounded-xl border bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-slate-400 focus:ring-2 ${
    error
      ? 'border-red-500 focus:ring-red-500/30'
      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/30'
  }`;
  const shared = {
    id,
    name,
    value,
    placeholder,
    autoComplete,
    className,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  } as const;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-slate-500">Opsional</span>}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} onChange={(e) => onChange(name, e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(name, e.target.value)} />
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface CvFieldProps {
  id: string;
  error?: string;
  onChange: (file: File | null) => void;
}

function CvField({ id, error, onChange }: CvFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        CV
      </label>
      <input
        id={id}
        name="cv"
        type="file"
        accept=".pdf,application/pdf"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${hintId} ${errorId}` : hintId}
        className={`w-full cursor-pointer rounded-xl border bg-white p-2 text-sm text-slate-600 outline-none transition-colors focus:ring-2 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-ink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-ink/90 ${
          error
            ? 'border-red-500 focus:ring-red-500/30'
            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/30'
        }`}
      />
      <p id={hintId} className="mt-1.5 text-xs text-slate-500">
        Format PDF, maksimal {MAX_CV_SIZE_MB} MB.
      </p>
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed text-slate-700 marker:text-slate-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const titleId = `${uid}-title`;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const style = categoryStyles[job.category];

  // <dialog> native: focus trap, tombol Esc, dan backdrop sudah ditangani browser.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  // Simulasi pengiriman. Tidak ada data yang dikirim ke server.
  useEffect(() => {
    if (status !== 'submitting') return undefined;
    const timer = window.setTimeout(() => setStatus('success'), 900);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleChange = (name: TextFieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCvChange = (file: File | null) => {
    setCv(file);
    setErrors((prev) => ({ ...prev, cv: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, cv);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    setStatus('submitting');
  };

  const closeDialog = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // Klik di area backdrop (di luar konten) menutup modal.
        if (e.target === e.currentTarget) closeDialog();
      }}
      className="m-0 mt-auto max-h-[92dvh] w-full max-w-full overflow-hidden rounded-t-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/70 motion-safe:animate-sheet sm:m-auto sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-3xl"
    >
      <div className="flex max-h-[92dvh] flex-col sm:max-h-[90dvh]">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-5 sm:px-8">
          <div>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}
            >
              {job.category}
            </span>
            <h2 id={titleId} className="mt-3 font-display text-2xl font-semibold tracking-tight">
              {job.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {job.team}, {job.type}, {job.mode}, {job.location}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Tutup"
            className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-ink focus-visible:outline-2 focus-visible:outline-blue-600"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="grid gap-8 overflow-y-auto p-5 sm:p-8 md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-slate-700">{job.summary}</p>
            <BulletList title="Yang akan kamu kerjakan" items={job.responsibilities} />
            <BulletList title="Yang kami cari" items={job.requirements} />
            {job.skills.length > 0 && (
              <section>
                <h3 className="font-display text-base font-semibold">Skill yang berguna</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {job.skills.map((skill) => (
                    <li key={skill} className="rounded-md bg-paper px-2 py-1 text-sm text-slate-700">
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {job.deadline && (
              <p className="text-sm text-slate-500">
                Pendaftaran ditutup{' '}
                <time dateTime={job.deadline}>{formatDeadline(job.deadline)}</time>.
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-paper p-5 sm:p-6">
            {status === 'success' ? (
              <div role="status" className="flex h-full flex-col items-start gap-4 py-4">
                <span className="grid size-12 place-items-center rounded-full bg-emerald-600 text-white">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5 9-10" />
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold">Lamaran terkirim</h3>
                <p className="text-[0.95rem] leading-relaxed text-slate-700">
                  Terima kasih, {values.name.trim()}. Ini versi demo, jadi tidak ada data yang
                  dikirim ke server.
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="mt-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-lg font-semibold">Lamar posisi ini</h3>
                <TextField idPrefix={uid} name="name" label="Nama lengkap" value={values.name} error={errors.name} autoComplete="name" onChange={handleChange} />
                <TextField idPrefix={uid} name="email" label="Email" type="email" value={values.email} error={errors.email} autoComplete="email" placeholder="nama@email.com" onChange={handleChange} />
                <CvField id={`${uid}-cv`} error={errors.cv} onChange={handleCvChange} />
                <TextField idPrefix={uid} name="portfolio" label="Tautan portofolio atau GitHub" type="url" value={values.portfolio} error={errors.portfolio} optional placeholder="https://" onChange={handleChange} />
                <TextField idPrefix={uid} name="motivation" label="Kenapa kamu tertarik?" multiline value={values.motivation} error={errors.motivation} onChange={handleChange} />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full rounded-xl bg-ink px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Mengirim…' : 'Kirim lamaran'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}