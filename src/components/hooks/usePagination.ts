import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo, useEffect, useRef } from 'react';

export const usePagination = (category?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const prevCategoryRef = useRef<string | undefined>(undefined);

  const page = useMemo(() => {
    const p = parseInt(searchParams.get('page') || '1', 10);

    return p > 0 ? p : 1;
  }, [searchParams]);

  const perPage = useMemo(() => {
    const pp = parseInt(searchParams.get('perPage') || '16', 10);

    return [8, 16, 32].includes(pp) ? pp : 16;
  }, [searchParams]);

  const sort = useMemo(() => {
    const s = searchParams.get('sort') || 'age';

    return ['age', 'name', 'price'].includes(s) ? s : 'age';
  }, [searchParams]);

  useEffect(() => {
    if (prevCategoryRef.current && prevCategoryRef.current !== category) {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set('page', '1');
      setSearchParams(newParams);
    }

    prevCategoryRef.current = category;
  }, [category, searchParams, setSearchParams]);

  const setParam = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      newParams.set(key, value);
      if (key === 'perPage' || key === 'sort') {
        newParams.set('page', '1');
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const updatePage = useCallback(
    (newPage: number) => {
      setParam('page', newPage.toString());
    },
    [setParam],
  );

  const updatePerPage = useCallback(
    (newPerPage: number) => {
      setParam('perPage', newPerPage.toString());
    },
    [setParam],
  );

  const updateSort = useCallback(
    (newSort: string) => {
      setParam('sort', newSort);
    },
    [setParam],
  );

  return {
    page,
    perPage,
    sort,
    updatePage,
    updatePerPage,
    updateSort,
  };
};
