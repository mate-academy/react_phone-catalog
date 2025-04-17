import { useSearchParams } from 'react-router-dom';

import { ItemsPerPage } from 'shared/constants/paginationOptions';
import { SortOptions } from 'shared/constants/sortOptions';

export function useProductQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam =
    (searchParams.get('sort') as SortOptions) || SortOptions.NEWEST;
  const itemsOnPageParam =
    (searchParams.get('itemsOnPage') as ItemsPerPage) || ItemsPerPage.ALL;
  const currentPage = Number(searchParams.get('page')) || 1;

  return {
    sortParam,
    itemsOnPageParam,
    currentPage,
    searchParams,
    setSearchParams,
  };
}
