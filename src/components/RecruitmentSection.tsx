import React from 'react';
import { JobCard } from './JobCard';
import { jobRoles } from '../data/jobs';

export const RecruitmentSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gray-50 py-20 dark:bg-black">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            Wujudkan Karir Impianmu
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Bergabunglah bersama Sekolah Karir. Temukan peran yang tepat untuk mengembangkan potensi maksimalmu bersama tim kami.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobRoles.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Call To Action */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Tidak menemukan posisi yang cocok?
          </p>
          <button className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-blue-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
            Lihat Semua Lowongan
          </button>
        </div>
      </div>
    </section>
  );
};