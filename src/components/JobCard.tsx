import React from 'react';
import type { JobRole } from '../data/jobs';

interface JobCardProps {
  job: JobRole;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/60">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {job.department}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {job.type}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {job.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>
      </div>
      <div className="mt-6">
        <button className="w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
          Lamar Sekarang
        </button>
      </div>
    </div>
  );
};