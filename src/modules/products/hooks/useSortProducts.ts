import { PRODUCT_SORT_OPTIONS } from '@/modules/products/constants';
import { ProductSort } from '@/modules/products/types';
import { QUERY_PARAMS } from '@/shared/constants';
import { useUpdateSearchParams } from '@/shared/hooks/useUpdateSearchParams';

export const useSortProducts = () => {
  const { updateSearchParams, searchParams } = useUpdateSearchParams();

  const sortBy = searchParams.get(QUERY_PARAMS.sort);
  const sort =
    PRODUCT_SORT_OPTIONS.find(option => sortBy === option.key) ||
    PRODUCT_SORT_OPTIONS[0];

  const handleSortChange = (option: ProductSort) => {
    updateSearchParams({
      [QUERY_PARAMS.page]: null,
      [QUERY_PARAMS.sort]: option.key,
    });
  };

  return { sort, handleSortChange };
};
