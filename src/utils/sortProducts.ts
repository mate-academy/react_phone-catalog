import type { Product } from '../types/Product';

export const sortProducts = (products: Product[], sort: string): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted.sort((a, b) => b.year - a.year);
  }
};
