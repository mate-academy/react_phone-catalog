import { getRange } from './getRange';
import { DOTS } from '../constants';

type Pagination = (
  totalCount: number | null,
  pageSize: number,
  currentPage: number,
  siblingCount?: number,
) => (string | number)[];

export const getPagination: Pagination = (
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
) => {
  const pageCountFromWidth = Math.ceil((pageSize - 104) / 40);

  if (!totalCount) {
    return [1];
  }

  if (totalCount <= pageCountFromWidth) {
    return getRange(1, totalCount);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalCount);

  const shouldShowLeftDots = leftSiblingIndex > 3;
  const shouldShowRightDots = rightSiblingIndex < totalCount - 4;

  const firstPageIndex = 1;
  const lastPageIndex = totalCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = pageCountFromWidth - 2 * siblingCount;
    const leftRange = getRange(1, leftItemCount);

    return [...leftRange, DOTS, totalCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = pageCountFromWidth - 2 - 1 * siblingCount;
    const rightRange = getRange(totalCount - rightItemCount, totalCount);

    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const replArr = Math.ceil((totalCount - pageCountFromWidth) / 2);
    const middleRange = getRange(replArr + 2, totalCount - replArr - 3);

    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return [];
};
