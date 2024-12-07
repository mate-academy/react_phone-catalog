import { useCallback, useEffect, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { PaginationPage } from '@shared/types/common';

import { MAX_PAGES_MOBILE, PAGINATION_DIVIDER } from '../utils/constants';

type Range = (number | typeof PAGINATION_DIVIDER)[];

export interface UsePaginationProps {
  maxRange?: number;
  totalPages: number;
  page: PaginationPage;
}

export const usePagination = ({
  page,
  totalPages,
  maxRange = MAX_PAGES_MOBILE,
}: UsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginationRange = useMemo(() => {
    const range: Range = [];
    const definedMaxRange = totalPages < maxRange ? totalPages : maxRange;
    const currentPage = page === 'all' || !page ? 1 : Number(page);

    if (page !== 1) {
      range.push(1);
    }

    range.push(currentPage);

    if (page !== totalPages) {
      range.push(totalPages);
    }

    let globalDiff = definedMaxRange - range.length;
    const hasSpaceNext = currentPage + 1 < totalPages;

    // forward + 1
    if (globalDiff && hasSpaceNext) {
      const nextPage = currentPage + 1;
      const currentPlace = range.indexOf(currentPage);

      range.splice(currentPlace + 1, 0, nextPage);
      globalDiff -= 1;
    }

    // backward all space
    if (globalDiff > 0) {
      let localDiff = 0;

      for (let i = 0; i < globalDiff; i++) {
        const candidate = currentPage - i - 1;

        if (candidate > 1) {
          const currentPlace = range.indexOf(currentPage);

          range.splice(currentPlace - i, 0, candidate);

          localDiff += 1;
        }
      }

      globalDiff -= localDiff;
    }

    // forward rest space
    if (globalDiff > 0) {
      for (let i = 0; i < globalDiff; i++) {
        const candidate = currentPage + i + 2;

        if (candidate < totalPages) {
          const currentPlace = range.indexOf(currentPage);

          range.splice(currentPlace + 2 + i, 0, candidate);
        }
      }
    }

    return range.reduce((acc, item, idx, arr) => {
      const prevItem = arr[idx - 1];

      if (typeof prevItem === 'number') {
        if (typeof item === 'number' && item - prevItem > 1) {
          return [...acc, PAGINATION_DIVIDER, item] as Range;
        }
      }

      return [...acc, item] as Range;
    }, [] as Range);
  }, [page, totalPages, maxRange]);

  const setNewPage = useCallback(
    (value: number) => {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('page', String(value));

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (Number(page) > totalPages) {
      setNewPage(totalPages);
    }
  }, [totalPages, page, setNewPage]);

  const onPageChange = useCallback(
    (value: number) => {
      setNewPage(value);
    },
    [setNewPage],
  );

  const onNextPage = useCallback(() => {
    if (!page || Number(page) === totalPages) {
      return;
    }

    const newPage = Number(page) + 1;

    setNewPage(newPage);
  }, [setNewPage, page, totalPages]);

  const onPrevPage = useCallback(() => {
    if (!page || Number(page) === 1) {
      return;
    }

    const newPage = Number(page) - 1;

    setNewPage(newPage);
  }, [setNewPage, page]);

  return {
    paginationRange,
    onNextPage,
    onPageChange,
    onPrevPage,
  };
};
