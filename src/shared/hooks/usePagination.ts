import { useCallback, useState } from 'react';

export const usePagination = () => {
  const [pagination, setPagination] = useState({ start: true, end: false });
  const [page, setPage] = useState(1);

  const onPrevPage = useCallback(() => {
    if (!pagination.start) {
      setPage(prev => prev - 1);
    }
  }, [pagination.start]);

  const updatePagination = useCallback(
    (value: { start: boolean; end: boolean }) => {
      if (!value.end) {
        setPage(prev => prev + 1);
      }

      setPagination(value);
    },
    [],
  );

  return {
    page,
    pagination,
    updatePagination,
    onPrevPage,
  };
};
