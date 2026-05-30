import { useMemo } from 'react';
import { Product } from '../interfaces/Product';

export type SortBy = 'age' | 'title' | 'price';
export type ItemsPerPage = 'all' | number;

interface Params {
  products: Product[];
  sortBy: SortBy;
  itemsPerPage: ItemsPerPage;
  page: number;
}

export const usePreparedProducts = ({
  products,
  sortBy,
  itemsPerPage,
  page,
}: Params) => {
  return useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'title':
          return a.name.localeCompare(b.name);
        case 'age':
        default:
          return b.year - a.year;
      }
    });

    if (itemsPerPage === 'all') {
      return sorted;
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return sorted.slice(start, end);
  }, [products, sortBy, itemsPerPage, page]);
};
