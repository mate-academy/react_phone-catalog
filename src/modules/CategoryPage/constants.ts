import { Category, SortType } from '../../types';

export const CATEGORY_TITLES: Record<Category, string> = {
  phones: 'Phones page',
  tablets: 'Tablets page',
  accessories: 'Accessories page',
};

export const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

export const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

export const DEFAULT_SORT: SortType = 'age';
export const DEFAULT_PER_PAGE = 'all';
export const DEFAULT_PAGE = 1;
