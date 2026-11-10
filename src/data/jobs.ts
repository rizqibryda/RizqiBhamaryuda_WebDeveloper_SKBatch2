export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
}

export const jobRoles: JobRole[] = [
  {
    id: 'SKR-01',
    title: 'Frontend Developer',
    department: 'Product & Technology',
    location: 'Remote',
    type: 'Internship',
  },
  {
    id: 'SKR-02',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Jakarta, Indonesia',
    type: 'Full-time',
  },
  {
    id: 'SKR-03',
    title: 'Product Marketing Specialist',
    department: 'Marketing',
    location: 'Bandung, Indonesia',
    type: 'Internship',
  },
];