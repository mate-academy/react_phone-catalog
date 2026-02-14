import { Product } from '../types/Product';

export const sortProducts = (products: Product[], sortBy: string) => {
  switch (sortBy) {
    case 'Newest':
      return products.sort((a, b) => b.year - a.year);

    case 'Alphabetically':
      return products.sort((a, b) => a.name.localeCompare(b.name));

    case 'Cheapest':
      return products.sort((a, b) => a.price - b.price);

    default:
      return products;
  }
};
