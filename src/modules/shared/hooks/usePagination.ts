import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Page } from '../types/Page';

type Params = {
  totalItems: number;
  itemsPerPage: number;
  enabled?: boolean;
};

export const usePagination = ({
  totalItems,
  itemsPerPage,
  enabled = true,
}: Params) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedPage = Number(searchParams.get('page') || '1');
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validRequestedPage = Number.isInteger(requestedPage)
    ? requestedPage
    : 1;
  const currentPage = enabled
    ? Math.min(Math.max(validRequestedPage, 1), totalPages)
    : validRequestedPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const range = (start: number, end: number) => {
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => index + start);
  };

  const getVisiblePages = (activePage: number, pagesCount: number): Page[] => {
    if (pagesCount <= 7) {
      return range(1, pagesCount);
    }

    if (activePage <= 4) {
      return [1, 2, 3, 4, 5, '...', pagesCount];
    }

    if (activePage >= pagesCount - 3) {
      return [
        1,
        '...',
        pagesCount - 4,
        pagesCount - 3,
        pagesCount - 2,
        pagesCount - 1,
        pagesCount,
      ];
    }

    return [
      1,
      '...',
      activePage - 1,
      activePage,
      activePage + 1,
      '...',
      pagesCount,
    ];
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    setSearchParams(params);
  };

  useEffect(() => {
    if (!enabled || currentPage === requestedPage) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (currentPage === 1) {
      params.delete('page');
    } else {
      params.set('page', String(currentPage));
    }

    setSearchParams(params, { replace: true });
  }, [currentPage, enabled, requestedPage, searchParams, setSearchParams]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    visiblePages,
    handlePageChange,
  };
};
