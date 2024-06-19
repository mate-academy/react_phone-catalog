import { DropdownItem } from '../types/DropdownItem';

export const DEFAULT_VALUE = 0;
export const DEFAULT_SLIDES = 1;
export const DEFAULT_GAP = 16;
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 'all';
export const DEFAULT_SORT_QUERY = 'Newest';

export const valuesSorts: DropdownItem[] = [
  'Newest',
  'Alphabetically',
  'Cheapest',
];

export const valuesPagination: DropdownItem[] = ['4', '8', '16', 'all'];
export const TIME_SLIDER = 5000;
