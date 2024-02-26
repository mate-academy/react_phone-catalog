import { Product } from '../types/Product';

export const sortProducts = (sortBy: string, products: Product[]) => {
  switch (sortBy) {
    case 'name':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    default:
      return [...products].sort((a, b) => b.year - a.year);
  }
};
