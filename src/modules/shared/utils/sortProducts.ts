import { Product } from '../types/Product';

export const getSortedProducts = (products: Product[], sortType: string) => {
  const sorted = [...products];

  switch (sortType) {
    case 'title':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return sorted.sort((a, b) => a.price - b.price);
    case 'age':
    default:
      return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }
};
