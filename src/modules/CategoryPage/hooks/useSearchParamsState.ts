import { useSearchParams } from 'react-router-dom';
import { DEFAULT_SEARCH_PARAMS } from '../../shared/constants';

export const useSearchParamsState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || DEFAULT_SEARCH_PARAMS.sort;
  const perPageParam =
    searchParams.get('perPage') || DEFAULT_SEARCH_PARAMS.perPage;
  const currentPage = Number(
    searchParams.get('page') || DEFAULT_SEARCH_PARAMS.page,
  );
  const perPage = perPageParam === 'all' ? 'all' : Number(perPageParam);
  const query = searchParams.get('query') || DEFAULT_SEARCH_PARAMS.query;

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      const typedKey = key as keyof typeof DEFAULT_SEARCH_PARAMS;

      if (value === DEFAULT_SEARCH_PARAMS[typedKey]) {
        newParams.delete(typedKey);
      } else if (Array.isArray(value)) {
        newParams.delete(typedKey);
        value.forEach(part => {
          newParams.append(typedKey, part);
        });
      } else {
        newParams.set(typedKey, value);
      }
    });

    setSearchParams(newParams);
  };

  const setSortBy = (value: string) => {
    updateParams({
      sort: value,
      page: DEFAULT_SEARCH_PARAMS.page,
    });
  };

  const setPerPage = (value: string) => {
    updateParams({
      perPage: value,
      page: DEFAULT_SEARCH_PARAMS.page,
    });
  };

  const setCurrentPage = (value: number) => {
    updateParams({
      page: String(value),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setQuery = (value: string) => {
    updateParams({
      query: value,
      page: DEFAULT_SEARCH_PARAMS.page,
    });
  };

  return {
    sortBy,
    perPage,
    currentPage,
    query,
    setSortBy,
    setPerPage,
    setCurrentPage,
    setQuery,
  };
};
