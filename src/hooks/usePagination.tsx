import { useMemo } from 'react';

export const DOTS = '...';

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
  totalCount: number;
  itemsPerPage: number;
  siblingCount?: number;
  currentPage: number;
}

export const usePagination = ({
  totalCount,
  itemsPerPage,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps): (string | number)[] => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / itemsPerPage);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, itemsPerPage, siblingCount, currentPage]);

  return paginationRange || [];
};
