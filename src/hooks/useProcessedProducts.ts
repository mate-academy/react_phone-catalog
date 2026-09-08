import { useMemo } from 'react';
import { Product } from '../types/Product';

export type Sort = 'hot' | 'year' | 'name' | 'price';

interface Filters {
  query?: string;
  category?: string;
}

interface ProcessOptions {
  sort: Sort;
  filters?: Filters;
}

export const useProcessedProducts = (
  products: Product[],
  { sort, filters = {} }: ProcessOptions,
): Product[] => {
  const processedProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (filters.query) {
      const normalizedQuery = filters.query.toLowerCase().trim();

      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery),
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category,
      );
    }

    const sortedProducts = [...filteredProducts];

    switch (sort) {
      case 'hot':
        sortedProducts.sort(
          (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
        );
        break;

      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'year':
      default:
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
    }

    return sortedProducts;
  }, [products, sort, filters]);

  return processedProducts;
};
