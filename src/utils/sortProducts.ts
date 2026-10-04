import { Product } from '../types/Product';

export type SortType = 'age' | 'title' | 'price';

export const DEFAULT_SORT: SortType = 'age';

export const sortProducts = (products: Product[], sort: SortType) => {
  const copy = [...products];

  switch (sort) {
    case 'title':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return copy.sort((a, b) => a.price - b.price);
    case 'age':
    default:
      // newest first
      return copy.sort((a, b) => b.year - a.year);
  }
};
