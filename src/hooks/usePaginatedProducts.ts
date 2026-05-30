import { useMemo } from 'react';
import { Product } from '../types/Product';

type PaginationOptions = {
  page: number;
  perPage: number | 'all';
};

type PaginatedResult = {
  visibleProducts: Product[];
  total: number;
};

export const usePaginatedProducts = (
  products: Product[],
  options: PaginationOptions,
): PaginatedResult => {
  const { page, perPage } = options;

  const paginatedResult = useMemo(() => {
    const total = products.length;

    if (perPage === 'all') {
      return {
        visibleProducts: products,
        total,
      };
    }

    const limit = Number(perPage);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const visibleProducts = products.slice(startIndex, endIndex);

    return {
      visibleProducts,
      total,
    };
  }, [products, page, perPage]);

  return paginatedResult;
};
