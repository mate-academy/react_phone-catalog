export type PerPage = '4' | '8' | '16' | 'all';

export const DEFAULT_PER_PAGE: PerPage = 'all';

export const PER_PAGE_OPTIONS: { value: PerPage; label: string }[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export function isPerPage(value: string | null): value is PerPage {
  return PER_PAGE_OPTIONS.some(option => option.value === value);
}

export function paginate<T>(items: T[], perPage: PerPage, page: number) {
  if (perPage === 'all') {
    return { pageItems: items, currentPage: 1, totalPages: 1 };
  }

  const size = Number(perPage);
  const totalPages = Math.max(Math.ceil(items.length / size), 1);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * size;

  return {
    pageItems: items.slice(start, start + size),
    currentPage,
    totalPages,
  };
}
