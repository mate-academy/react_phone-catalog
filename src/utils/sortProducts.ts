import { Product } from '../types/Product';

export const sortProducts = (sort: string, products: Product[]) => {
  switch (sort) {
    case 'title':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));

    case 'price':
      return [...products].sort((a, b) => a.price - b.price);

    case 'age':
      return [...products].sort((a, b) => b.year - a.year);

    default:
      return products;
  }
};
