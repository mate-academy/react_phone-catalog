import { useSearchParams } from 'react-router-dom';

export const useCatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'newest';
  const itemsParam = searchParams.get('items') || '16';

  const itemsPerPage: number | 'all' =
    itemsParam === 'all' ? 'all' : Number(itemsParam);

  const changeItemsPerPage = (value: number | 'all') => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('items', value.toString());
      params.set('page', '1');
      return params;
    });
  };

  const changeSort = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set('sort', value);
        params.set('page', '1');
      } else {
        params.delete('sort');
      }
      return params;
    });
  };

  return {
    sort,
    itemsPerPage,
    changeItemsPerPage,
    changeSort,
  };
};
