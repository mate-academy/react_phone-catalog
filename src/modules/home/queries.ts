import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCategoryCounts } from '@/service/api/products';

export const productKeys = {
  categoryCounts: ['products', 'category-counts'],
};

export const useCategoryCountsQuery = () => {
  return useQuery({
    queryKey: productKeys.categoryCounts,
    queryFn: () => getCategoryCounts(),
    placeholderData: keepPreviousData,
  });
};
