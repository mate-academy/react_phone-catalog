import { useMemo } from 'react';

export const DOTS = '...';

function getArrayRange(from: number, to: number) {
  const pages = [];

  for (let i = from; i <= to; i++) {
    pages.push(i);
  }

  return pages;
}

export const usePagination = ({
  totalCount,
  itemsPerPage,
  currentPage,
  siblingCount = 1,
}: {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  siblingCount?: number;
}) => {
  const pagination = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / itemsPerPage);
    const totalPageNumbers = siblingCount + 5;

    // Case 1: no dots to show
    if (totalPageNumbers >= totalPageCount) {
      return getArrayRange(1, totalPageCount);
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

    // Case 2: only right dots to show
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = getArrayRange(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    // Case 3: only left dots to show
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = getArrayRange(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: both left and right dots to show
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = getArrayRange(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    throw new Error('Smth went wrong');
  }, [totalCount, itemsPerPage, currentPage, siblingCount]);

  return pagination;
};
