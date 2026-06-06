import { useMemo } from 'react';
import { Product } from '../types/Product';

export const usePagination = (
  products: Product[],
  currentPage: number,
  productsPerPage = 16,
) => {
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(products.length / productsPerPage));
  }, [products.length, productsPerPage]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;

    return products.slice(startIndex, startIndex + productsPerPage);
  }, [products, currentPage, productsPerPage]);

  return { currentPage, totalPages, visibleItems };
};
