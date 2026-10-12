import { Product } from '@/shared/types';

export const PRODUCT_SORT_OPTIONS = [
  {
    key: 'age',
    labelValue: 'Newest',
    compare: (item1: Product, item2: Product) => item2.year - item1.year,
  },
  {
    key: 'title',
    labelValue: 'Alphabetically',
    compare: (item1: Product, item2: Product) =>
      item2.name.localeCompare(item1.name),
  },
  {
    key: 'price',
    labelValue: 'Cheapest',
    compare: (item1: Product, item2: Product) => item1.price - item2.price,
  },
] as const;

export const PRODUCT_CATEGORIES = {
  phones: 'phones',
  tablets: 'tablets',
  accessories: 'accessories',
} as const;

export const PRODUCT_SORT_KEYS = PRODUCT_SORT_OPTIONS.map(option => option.key);

export const specialColors: Record<string, string> = {
  spacegray: '#535353',
  midnightgreen: '#4E5851',
  starlight: '#F0EAD6',
  productred: '#BF0010',
  pacificblue: '#215E7C',
  white: '#F0F0F0',
  purple: '#B7AFE6',
  midnight: '#232A31',
  sierrablue: '#A7C1D9',
  gold: '#F4E8CE',
  spaceblack: '#4b4845',
};
