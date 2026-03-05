import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PerPageType, SortType } from '../types/Types';

export const useCatalogParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const queryParam = searchParams.get('query') || '';

  const sort =
    sortParam === SortType.AGE ||
    sortParam === SortType.TITLE ||
    sortParam === SortType.PRICE
      ? sortParam
      : SortType.AGE;

  const page = Number(pageParam) || 1;
  const perPage = perPageParam
    ? perPageParam === PerPageType.ALL
      ? PerPageType.ALL
      : Number(perPageParam)
    : PerPageType.ALL;

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSort = event.target.value;
      const newParams = new URLSearchParams(searchParams);

      newParams.set('sort', newSort);
      newParams.set('page', '1');
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handlePerPageChange = useCallback(
    (newPerPage: string) => {
      const newParams = new URLSearchParams(searchParams);

      newParams.set('perPage', newPerPage);
      newParams.set('page', '1');
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newParams = new URLSearchParams(searchParams);

      if (newPage === 1) {
        newParams.delete('page');
      } else if (perPage === PerPageType.ALL) {
        newParams.delete('perPage');
      } else {
        newParams.set('page', newPage.toString());
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams, perPage],
  );

  const handleQueryChange = useCallback(
    (newQuery: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (newQuery.trim()) {
        newParams.set('query', newQuery);
      } else {
        newParams.delete('query');
      }

      newParams.set('page', '1');
      setSearchParams(newParams);
    },

    [searchParams, setSearchParams],
  );

  return {
    sort,
    page,
    perPage,
    query: queryParam,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    handleQueryChange,
  };
};
