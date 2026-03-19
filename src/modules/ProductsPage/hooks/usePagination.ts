import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import type { RootState } from '../../../store';
import { Category, Sort } from '../../../types';
import { useEffect } from 'react';

export const usePagination = (category: Category | null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort') as Sort) || Sort.Age;
  const perPage = Number(searchParams.get('perPage')) || Infinity;
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  const data = useSelector((state: RootState) =>
    selectPreparedProducts(
      state,
      category,
      sortBy,
      perPage,
      currentPage,
      query,
    ),
  );

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }

    setSearchParams(params);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage, perPage]);

  return {
    ...data,
    setPage,
  };
};
