import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_ON_PAGE_OPTIONS } from '../constants/itemsOnPageOptions';
import { SORT_BY_OPTIONS } from '../constants/sortByOptions';

export function useCatalogParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSort = SORT_BY_OPTIONS[0].value;
  const defaultPerPage = ITEMS_ON_PAGE_OPTIONS[2].value;

  const urlSort = searchParams.get('sort') || defaultSort;
  const urlPage = Number(searchParams.get('page') || 1);
  const urlPerPage =
    searchParams.get('perPage') === 'all' ?
      'all'
    : Number(searchParams.get('perPage') || defaultPerPage);

  const updateParams = useCallback(
    (sortBy: string, currentPage: number, itemsOnPage: number | string) => {
      const params: Record<string, string> = {};

      if (sortBy !== defaultSort) params.sort = sortBy;
      if (
        itemsOnPage !== 'all' &&
        itemsOnPage !== ITEMS_ON_PAGE_OPTIONS[3].value
      ) {
        params.perPage = String(itemsOnPage);
        if (currentPage !== 1) params.page = String(currentPage);
      }

      setSearchParams(params);
    },
    [setSearchParams, defaultSort],
  );

  return {
    urlSort,
    urlPage,
    urlPerPage,
    updateParams,
  };
}
