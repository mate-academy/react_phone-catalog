import { useMemo } from 'react';
import { Product } from '../types/Product';

export const usePagination = (
  products: Product[],
  currentPage: number,
  productsPerPage = '16',
) => {
  const itemsPerPage = useMemo(() => {
    if (productsPerPage === 'all') {
      return products.length || 1;
    }

    const parsed = Number(productsPerPage);

    return isNaN(parsed) || parsed <= 0 ? products.length || 1 : parsed;
  }, [products.length, productsPerPage]);

  const totalPages = useMemo(() => {
    if (productsPerPage === 'all') {
      return 1;
    }

    return Math.max(1, Math.ceil(products.length / itemsPerPage));
  }, [products.length, productsPerPage, itemsPerPage]);

  const visibleItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage, itemsPerPage]);

  return { currentPage, totalPages, visibleItems };
};
