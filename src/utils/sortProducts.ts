import { Product } from '../types/Product';

export type SortOption = 'name' | 'price' | '';

export const sortProducts = (products: Product[], sort: string): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
};
