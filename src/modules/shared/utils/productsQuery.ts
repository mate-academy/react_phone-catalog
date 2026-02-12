export type SortParam = 'age' | 'title' | 'price';
export type SortLabel = 'Newest' | 'Alphabetically' | 'Cheapest';
export type PerPage = 4 | 8 | 16 | 'all';

export const SORT_OPTIONS: SortLabel[] = [
  'Newest',
  'Alphabetically',
  'Cheapest',
];
export const PER_PAGE_OPTIONS: PerPage[] = [4, 8, 16, 'all'];

export const SORT_MAP: Record<SortLabel, SortParam> = {
  Newest: 'age',
  Alphabetically: 'title',
  Cheapest: 'price',
};

export const SORT_LABEL_MAP: Record<SortParam, SortLabel> = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

export const DEFAULT_SORT: SortParam = 'age';
export const DEFAULT_PER_PAGE: PerPage = 16;
export const DEFAULT_PAGE = 1;

export const normalizeSort = (value: string | null): SortParam =>
  value === 'age' || value === 'title' || value === 'price'
    ? value
    : DEFAULT_SORT;

export const normalizePerPage = (value: string | null): PerPage => {
  if (value === 'all') {
    return 'all';
  }

  const n = Number(value);

  return n === 4 || n === 8 || n === 16 ? n : DEFAULT_PER_PAGE;
};

export const normalizePage = (value: string | null): number => {
  const n = Number(value);

  return Number.isFinite(n) && n > 0 ? n : DEFAULT_PAGE;
};
