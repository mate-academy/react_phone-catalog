import { useMemo } from 'react';

export interface UsePaginationProps {
  totalItems: number;
  currentPage: number;
  perPage: string | number;
}

export interface UsePaginationResult {
  totalPages: number;
  pageNumbers: number[];
  startIndex: number;
  endIndex: number;
}

export const usePagination = ({
  totalItems,
  currentPage,
  perPage,
}: UsePaginationProps): UsePaginationResult => {
  return useMemo(() => {
    if (perPage === 'all' || perPage === 'All') {
      return {
        totalPages: 1,
        pageNumbers: [],
        startIndex: 0,
        endIndex: totalItems,
      };
    }

    const itemsPerPage = Number(perPage) || 16;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const pageNumbers: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      totalPages,
      pageNumbers,
      endIndex,
      startIndex,
    };
  }, [totalItems, currentPage, perPage]);
};
