import { getSearchWith } from '@/utils/getSearchWith';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (
  {
    totalItems,
    itemsPerPage,
    pagesToViewCount = 4,
    scrollToTop = false,
  }: {
    totalItems: number;
    itemsPerPage: number;
    pagesToViewCount?: number;
    scrollToTop?: boolean;
  },
  resetDependency: any[] = [],
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const urlPage = searchParams.get('page') || 1;
  const page = +urlPage;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleScroll = () => {
    if (scrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const setPage = (newPage: number | null) => {
    let preparedPage = null;

    if (newPage) {
      preparedPage = newPage.toString();
      handleScroll();
    }

    setSearchParams(getSearchWith({ page: preparedPage }, searchParams));
  };

  const handleNextPage = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  const handlePrevPage = () => {
    setPage(Math.max(1, page - 1));
  };

  useEffect(() => {
    if (page < 1) {
      setPage(1);

      return;
    }

    if (page > totalPages) {
      setPage(totalPages);

      return;
    }
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(null);
    }
  }, [...resetDependency]);

  const visiblePages: number[] = useMemo(() => {
    const currentBlock = Math.floor((page - 1) / (pagesToViewCount - 1));

    let start = currentBlock * (pagesToViewCount - 1) + 1;
    const end = Math.min(start + pagesToViewCount - 1, totalPages);

    if (end === totalPages) {
      start = Math.max(1, end - pagesToViewCount + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [page, totalPages, pagesToViewCount]);

  const prevBtnDisabled = page === 1;
  const nextBtnDisabled = page === totalPages;

  return {
    activePage: page,
    handleChangePage: setPage,
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
