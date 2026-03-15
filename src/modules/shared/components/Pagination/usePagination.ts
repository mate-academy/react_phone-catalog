import { useMemo } from 'react';

export const usePagination = (
  total: number,
  current: number,
  onPageChange: (page: number) => void,
) => {
  const pages = useMemo(() => {
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [total]);

  const isFirstPage = current === 1;
  const isLastPage = current === total;
  const isHidden = total <= 1;

  const handlePrev = () => {
    if (!isFirstPage) {
      onPageChange(current - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(current + 1);
    }
  };

  return {
    pages,
    isHidden,
    isFirstPage,
    isLastPage,
    handlePrev,
    handleNext,
  };
};
