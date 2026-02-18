import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import type { RootState } from '../store';
import { Category, Sort } from '../types';

export const usePagination = (category: Category | null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort') as Sort) || Sort.Age;
  const perPage = Number(searchParams.get('perPage')) || Infinity;
  const currentPage = Number(searchParams.get('page')) || 1;

  const data = useSelector((state: RootState) =>
    selectPreparedProducts(state, category, sortBy, perPage, currentPage),
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

  return {
    ...data,
    setPage,
  };
};
