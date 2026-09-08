import { Product } from '../types/Product';

export const SORT_KEY = {
  AGE: 'age',
  PRICE: 'price',
  TITLE: 'title',
};

export const mapSortCallbacksToSortKey = {
  [SORT_KEY.AGE]: (a: Product, b: Product) => b.year - a.year,
  [SORT_KEY.PRICE]: (a: Product, b: Product) => a.price - b.price,
  [SORT_KEY.TITLE]: (a: Product, b: Product) => a.name.localeCompare(b.name),
};

export const sortOptions = [
  { key: SORT_KEY.AGE, label: 'Newest' },
  { key: SORT_KEY.PRICE, label: 'Cheapest' },
  { key: SORT_KEY.TITLE, label: 'Alphabetically' },
];

export const itemsPerPage = ['4', '8', '16', 'All'];
