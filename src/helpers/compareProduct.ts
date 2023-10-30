import { Product } from '../types/Product';

export const compareProduct = (product: Product, query: string) => {
  const searchQueries = query.toLowerCase().split(' ');

  for (let i = 0; i < searchQueries.length; i += 1) {
    const searchQuery = searchQueries[i];

    if (!product.name.toLowerCase().includes(searchQuery)) {
      return false;
    }
  }

  return true;
};
