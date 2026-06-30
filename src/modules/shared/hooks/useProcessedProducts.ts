import { useMemo } from 'react';
import { Product } from '../../../types/Product';

export const useProcessedProducts = (
  products: Product[],
  sortType: string | null,
  page: number,
  perPage: number | 'all',
) => {
  return useMemo(() => {
    const copy = [...products];

    copy.sort((a, b) => {
      switch (sortType) {
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

    if (perPage === 'all') {
      return copy;
    }

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    return copy.slice(startIndex, endIndex);
  }, [products, sortType, page, perPage]);
};
