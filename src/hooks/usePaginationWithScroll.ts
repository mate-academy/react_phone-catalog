import { useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePaginationWithScroll = <T>(
  items: T[],
  itemsPerPage: number,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const currentPage = Math.max(1, Math.min(pageFromUrl, totalPages));

  const scrollToPage = useCallback(
    (page: number) => {
      const safePage = Math.max(1, Math.min(page, totalPages));

      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);

        newParams.set('page', String(safePage));

        return newParams;
      });

      requestAnimationFrame(() => {
        containerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      });
    },
    [setSearchParams, totalPages],
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
