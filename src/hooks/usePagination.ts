import { useEffect, useMemo } from 'react';
import { Product } from '../types/Product';

export type PerPage = '4' | '8' | '16' | 'all';

interface UsePaginationProps {
  products: Product[];
  params: Record<string, string>;
  setParam: (key: string, value: string | null) => void;
  setParams?: (updates: Record<string, string | null>) => void;
}

export const usePagination = ({
  products,
  params,
  setParam,
  setParams,
}: UsePaginationProps) => {
  const perPage: PerPage =
    params.perPage === '4' ||
    params.perPage === '8' ||
    params.perPage === '16' ||
    params.perPage === 'all'
      ? params.perPage
      : 'all';

  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const totalPages =
    perPage === 'all'
      ? 1
      : Math.max(1, Math.ceil(products.length / Number(perPage)));

  const safePage = Math.min(page, totalPages);

  useEffect(() => {
    if (safePage !== page) {
      setParam('page', safePage === 1 ? null : String(safePage));
    }
  }, [safePage, page, setParam]);

  // Slice products
  const paginatedProducts = useMemo(() => {
    if (perPage === 'all') {
      return products;
    }

    const start = (safePage - 1) * Number(perPage);

    return products.slice(start, start + Number(perPage));
  }, [products, safePage, perPage]);

  // Update page
  const setPage = (newPage: number) => {
    const nextPage = Math.max(1, Math.min(newPage, totalPages));

    setParam('page', nextPage === 1 ? null : String(nextPage));
  };

  // Update perPage
  const setPerPage = (value: PerPage) => {
    if (setParams) {
      setParams({
        perPage: value === 'all' ? null : value,
        page: null,
      });

      return;
    }

    setParam('perPage', value === 'all' ? null : value);
    setParam('page', null);
  };

  return {
    page: safePage,
    perPage,
    totalPages,
    paginatedProducts,
    setPage,
    setPerPage,
  };
};
