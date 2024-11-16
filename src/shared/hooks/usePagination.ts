import { useCallback, useState } from 'react';

export const usePagination = () => {
  const [pagination, setPagination] = useState({ isStart: true, isEnd: false });
  const [page, setPage] = useState(1);

  const onNextPage = useCallback(() => {
    if (!pagination.isEnd) {
      setPage(prev => prev + 1);
    }
  }, [pagination.isEnd]);

  const onPrevPage = useCallback(() => {
    if (!pagination.isStart) {
      setPage(prev => prev - 1);
    }
  }, [pagination.isStart]);

  const updatePagination = useCallback(
    (value: { isEnd: boolean; isStart: boolean }) => {
      setPagination(value);
    },
    [],
  );

  return {
    page,
    pagination,
    updatePagination,
    onNextPage,
    onPrevPage,
  };
};
