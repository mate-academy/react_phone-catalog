import { useEffect, useMemo, useState } from 'react';
import { range } from '../../utils/range';

type Props = {
  totalItems: number;
  itemsOnPage: number | string;
  siblingCount: number;
  currentPage: number;
};

export const DOTS = '...';

// const windowSize = window.innerWidth < 640;

export const usePagination = ({
  totalItems,
  itemsOnPage,
  siblingCount = 1,
  currentPage,
}: Props): (number | string)[] => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setMobile(window.innerWidth < 640);
    };

    checkWindowSize();

    window.addEventListener('resize', checkWindowSize);

    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, []);

  return useMemo(() => {
    const itemsPerPage =
      itemsOnPage === 'all' ? totalItems : Number(itemsOnPage);

    const totalPageCount = Math.ceil(totalItems / itemsPerPage);

    if (totalPageCount <= 5) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    // Always show first and last page
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Case 2: No left dots, but right dots
      const leftRange = range(1, 3);

      return [...leftRange, DOTS, totalPageCount];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      // Case 3: No right dots, but left dots
      const rightRange = range(totalPageCount - 2, totalPageCount);

      return [1, DOTS, ...rightRange];
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      // Case 4: Both left and right dots
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      if (mobile) {
        return [1, ...middleRange, totalPageCount];
      } else {
        return [1, DOTS, ...middleRange, DOTS, totalPageCount];
      }
    }

    return range(1, totalPageCount);
  }, [totalItems, itemsOnPage, siblingCount, currentPage]);
};
