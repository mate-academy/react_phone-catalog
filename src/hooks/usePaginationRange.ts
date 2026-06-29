import { useMemo } from 'react';

type Params = {
  currentPage: number;
  totalPages: number;
  visiblePages: number;
};

export function usePaginationRange({
  currentPage,
  totalPages,
  visiblePages,
}: Params) {
  return useMemo(() => {
    const half = Math.floor(visiblePages / 2);

    const start = Math.max(
      1,
      Math.min(currentPage - half, totalPages - visiblePages + 1),
    );

    const end = Math.min(totalPages, start + visiblePages - 1);

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages, visiblePages]);
}
