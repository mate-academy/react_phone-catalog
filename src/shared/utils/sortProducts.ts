import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sort: string) => {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'age':
        return b.year - a.year;

      case 'title':
        return a.name.localeCompare(b.name);

      case 'price':
        return a.price - b.price;

      default:
        return 0;
    }
  });
};
