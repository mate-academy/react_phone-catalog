import { useCallback, useEffect, useState } from 'react';

import { usePagination } from '@shared/hooks/usePagination';
import { ResponseWithPagination } from '@shared/services/api/api';
import { ProductCoverModel } from '@shared/types/Product';

interface UseProductCoversQuery {
  queryFn: (
    page: number,
  ) => Promise<ResponseWithPagination<ProductCoverModel[]>>;
}

export const useProductCoversQuery = ({ queryFn }: UseProductCoversQuery) => {
  const {
    page: paginationPage,
    pagination,
    updatePagination,
  } = usePagination();

  const [data, setData] = useState<ProductCoverModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const loadSlides = useCallback(
    async (page: number) => {
      setIsLoading(true);

      try {
        const { data: newData, meta } = await queryFn(page);

        setData(prev => [...prev, ...newData]);
        updatePagination({ end: meta.end, start: meta.start });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setData, updatePagination],
  );

  useEffect(() => {
    setIsInitialLoading(true);
    loadSlides(paginationPage).then(() => setIsInitialLoading(false));
  }, []);

  const onLoadNextProducts = () => {
    if (!pagination.end) {
      loadSlides(paginationPage);
    }
  };

  return {
    products: data,
    isLoading,
    isInitialLoading,
    onLoadNextProducts,
  };
};
