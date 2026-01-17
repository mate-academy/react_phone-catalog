import { Page } from '@/types/Page';
import { getSearchWith } from '@/utils/getSearchWith';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const BOUNDARY_COUNT = 1;

function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
}

export const usePagination = (
  {
    totalItems,
    itemsPerPage,
    siblingCount = 1,
  }: {
    totalItems: number;
    itemsPerPage: number;
    siblingCount?: number;
  },
  resetDependency: unknown[] = [],
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isFirstRender = useRef(true);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage],
  );

  const urlPage = searchParams.get('page');
  const currentPage = Number(urlPage) || 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChangePage = useCallback(
    (newPage: number | null) => {
      if (newPage === currentPage) {
        return;
      }

      const pageValue =
        newPage === null || newPage <= 1 ? null : newPage.toString();

      setSearchParams(getSearchWith({ page: pageValue }, searchParams));
    },
    [currentPage, searchParams, setSearchParams],
  );

  const handleNextPage = useCallback(() => {
    handleChangePage(Math.min(totalPages, currentPage + 1));
  }, [totalPages, currentPage]);

  const handlePrevPage = useCallback(() => {
    handleChangePage(Math.max(1, currentPage - 1));
  }, [currentPage]);

  useEffect(() => {
    if (totalItems === 0) {
      return;
    }

    if (currentPage < 1) {
      handleChangePage(1);
    } else if (currentPage > totalPages && totalPages > 0) {
      handleChangePage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    if (currentPage !== 1) {
      handleChangePage(null);
    }
  }, resetDependency);

  const visiblePages: Page[] = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + BOUNDARY_COUNT * 2 + 3;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(totalPages, currentPage + siblingCount);

    const showLeftDots = leftSiblingIndex > BOUNDARY_COUNT + 2;
    const showRightDots = rightSiblingIndex < totalPages - (BOUNDARY_COUNT + 1);

    const firstPages = range(1, BOUNDARY_COUNT);
    const lastPages = range(totalPages - BOUNDARY_COUNT + 1, totalPages);

    if (!showLeftDots && showRightDots) {
      const leftCount = BOUNDARY_COUNT + 2 * siblingCount + 2;

      return [...range(1, leftCount), '...', ...lastPages];
    }

    if (showLeftDots && showRightDots) {
      return [
        ...firstPages,
        '...',
        ...range(leftSiblingIndex, rightSiblingIndex),
        '...',
        ...lastPages,
      ];
    }

    if (showLeftDots && !showRightDots) {
      const rightCount = BOUNDARY_COUNT + 2 * siblingCount + 2;

      return [
        ...firstPages,
        '...',
        ...range(totalPages - rightCount + 1, totalPages),
      ];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);

  const prevBtnDisabled = currentPage === 1;
  const nextBtnDisabled = currentPage === totalPages;

  return {
    activePage: currentPage,
    handleChangePage,
    handleNextPage,
    handlePrevPage,
    totalPages,
    visiblePages,
    startIndex,
    endIndex,
    prevBtnDisabled,
    nextBtnDisabled,
  };
};
