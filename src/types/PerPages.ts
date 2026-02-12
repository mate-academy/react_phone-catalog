export const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'] as const;
export type PerPage = (typeof PER_PAGE_OPTIONS)[number];
