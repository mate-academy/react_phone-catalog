import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sorted: string) => {
  switch (sorted) {
    case 'Newest':
      return [...products].sort(
        (a, b) => new Date(b.year).getTime() - new Date(a.year).getTime(),
      );
    case 'Cheapest':
      return [...products].sort((a, b) => a.price - b.price);
    case 'Alphabetically':
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return products;
  }
};
