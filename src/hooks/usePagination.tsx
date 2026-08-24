import { useMemo } from 'react';

type UsePaginationProps<T> = {
  items: T[];
  itemsPerPage?: number;
  currentPage: number;
};

export const usePagination = <T,>({
  items,
  itemsPerPage = 16,
  currentPage,
}: UsePaginationProps<T>) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const visibleItems = useMemo(
    () =>
      items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [items, currentPage, itemsPerPage],
  );

  return {
    totalPages,
    visibleItems,
  };
};
