import { useSearchParams } from 'react-router-dom';
import { ItemsPerPage, SortBy } from './usePreparedProducts';

export const useProductsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortBy) || 'age';

  const itemsPerPage: ItemsPerPage =
    searchParams.get('items') === 'all'
      ? 'all'
      : Number(searchParams.get('items')) || 'all';

  const page = Number(searchParams.get('page')) || 1;

  const updateParams = (params: {
    sort?: SortBy;
    items?: ItemsPerPage;
    page?: number;
  }) => {
    setSearchParams({
      sort: params.sort ?? sortBy,
      items: String(params.items ?? itemsPerPage),
      page: String(params.page ?? page),
    });
  };

  return {
    sortBy,
    itemsPerPage,
    page,

    setSort: (sort: SortBy) => updateParams({ sort, page: 1 }),

    setItems: (items: ItemsPerPage) => updateParams({ items, page: 1 }),

    setPage: (newPage: number) => updateParams({ page: newPage }),
  };
};
