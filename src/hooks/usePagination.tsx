import { useMemo } from 'react';
import { getNumbers } from '../helpers/getNumbers';

export const usePagination = (
  totalPageCount: number,
  siblingCount = 1,
  currentPage: number,
) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return getNumbers(1, totalPageCount);
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
      const leftRange = getNumbers(1, leftItemCount);

      return [...leftRange, 'DOTS', totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = getNumbers(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, 'DOTS', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getNumbers(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
    }

    return getNumbers(1, totalPageCount);
  }, [totalPageCount, siblingCount, currentPage]);

  return paginationRange;
};
