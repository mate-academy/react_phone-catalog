import { useCallback, useEffect, useState } from 'react';

import { usePagination } from '@shared/hooks/usePagination';
import { ResponseWithPagination } from '@shared/services/api/api';
import { ProductCoverModel } from '@shared/types/Product';
import { INITIAL_PAGINATION_PAGE } from '@shared/utils/constants';

interface UseProductCoversQuery {
  excludeId?: string;
  queryFn: (
    page: number,
  ) => Promise<ResponseWithPagination<ProductCoverModel[]>>;
}

export const useProductCoversQuery = ({
  queryFn,
  excludeId,
}: UseProductCoversQuery) => {
  const {
    page: paginationPage,
    pagination,
    updatePagination,
  } = usePagination();

  const [data, setData] = useState<ProductCoverModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const updateData = useCallback((newData: ProductCoverModel[]) => {
    setData(prev => {
      const filteredNewData = newData
        .filter(
          newDataItem =>
            !prev.some(prevDataItem => prevDataItem.id === newDataItem.id),
        )
        .flat();

      return [...prev, ...filteredNewData];
    });
  }, []);

  const loadSlides = useCallback(
    async (page: number) => {
      setIsLoading(true);

      try {
        const { data: newData, meta } = await queryFn(page);

        updateData(newData);
        updatePagination({ end: meta.end, start: meta.start });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, updatePagination, queryFn, updateData],
  );

  useEffect(() => {
    setIsInitialLoading(true);
    loadSlides(INITIAL_PAGINATION_PAGE).then(() => setIsInitialLoading(false));
  }, [loadSlides, setIsInitialLoading]);

  const onLoadNextProducts = () => {
    if (!pagination.end) {
      loadSlides(paginationPage);
    }
  };

  return {
    products: data.filter(({ itemId }) => excludeId !== itemId),
    isLoading,
    isInitialLoading,
    onLoadNextProducts,
  };
};
