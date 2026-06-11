import { CategoryType, PerPageType, SortType } from './types';

export const pageTitles: Record<CategoryType, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const SORT_OPTIONS = [
  { value: SortType.Age, label: 'Newest' },
  { value: SortType.Title, label: 'Alphabetically' },
  { value: SortType.Price, label: 'Cheapest' },
];

export const PER_PAGE_OPTIONS = [
  { value: PerPageType.Sixteen, label: '16' },
  { value: PerPageType.Eight, label: '8' },
  { value: PerPageType.Four, label: '4' },
  { value: PerPageType.All, label: 'all' },
];

export const PRODUCT_COLORS_MAP = {
  black: '#1c1d21',
  spaceblack: '#2e2c2b',
  midnight: '#2b303a',
  green: '#aee1cd',
  yellow: '#ffe681',
  white: '#f9f6ef',
  purple: '#d1c4e9',
  red: '#ba0c2f',
  spacegray: '#535150',
  silver: '#e3e4e5',
  gold: '#f9e5c9',
  midnightgreen: '#4e5851',
  starlight: '#f0eae4',
  blue: '#215e79',
  pink: '#fae0e4',
  coral: '#ff6f61',
  rosegold: '#fad6d8',
  graphite: '#41424c',
  sierrablue: '#9bb5ce',
};
