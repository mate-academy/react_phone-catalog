import { useMemo } from 'react';

export const usePagination = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
) => {
  return useMemo<(number | string)[]>(() => {
    const pages: (number | string)[] = [];

    const left = Math.max(currentPage - siblingCount, 1);
    const right = Math.min(currentPage + siblingCount, totalPages);

    pages.push(1);

    if (left > 2) {
      pages.push('...');
    }

    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (right < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, siblingCount]);
};
