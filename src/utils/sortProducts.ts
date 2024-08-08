import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sortKey: string) => {
  switch (sortKey) {
    case 'age':
      return [...products].sort((a, b) => b.year - a.year);
    case 'title':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case 'price':
      return [...products].sort((a, b) => a.price - b.price);
    default:
      return products;
  }
};
