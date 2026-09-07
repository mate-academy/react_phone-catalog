import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('perPage') || '16', 10);
  const sort = searchParams.get('sort') || 'age';

  const updatePage = useCallback(
    (value: number) => {
      searchParams.set('page', value.toString());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const updatePerPage = useCallback(
    (value: number) => {
      searchParams.set('perPage', value.toString());
      searchParams.set('page', '1'); // завжди починати з 1 при зміні perPage
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const updateSort = useCallback(
    (value: string) => {
      searchParams.set('sort', value);
      searchParams.set('page', '1'); // починаємо з 1 при зміні сортування
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  return { page, perPage, sort, updatePage, updatePerPage, updateSort };
};
