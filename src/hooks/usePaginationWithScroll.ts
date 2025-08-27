import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePaginationWithScroll = <T>(
  items: T[],
  itemsPerPage: number,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const initialPage = Math.max(
    1,
    Math.min(Number(searchParams.get('page')) || 1, totalPages),
  );

  const [currentPage, setCurrentPage] = useState(initialPage);

  const scrollToPage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, Math.min(page, totalPages));

      setCurrentPage(safePage);
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);

        newParams.set('page', String(safePage));

        return newParams;
      });

      requestAnimationFrame(() => {
        containerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      });
    },
    [setSearchParams, totalPages, setCurrentPage],
  );

  const goPrev = useCallback(() => {
    scrollToPage(currentPage - 1);
  }, [scrollToPage, currentPage]);

  const goNext = useCallback(() => {
    scrollToPage(currentPage + 1);
  }, [scrollToPage, currentPage]);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return {
    currentPage,
    totalPages,
    paginatedItems,
    containerRef,
    goPrev,
    goNext,
    scrollToPage,
  };
};
