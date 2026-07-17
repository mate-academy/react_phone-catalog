import { Product } from '../../types/Products';

export const sortProducts = (products: Product[], sortBy: string) => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.name.localeCompare(b.name);

      case 'cheapest':
        return a.price - b.price;

      case 'newest':
      default:
        return b.year - a.year;
    }
  });
};
