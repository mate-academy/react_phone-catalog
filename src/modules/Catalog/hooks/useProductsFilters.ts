import { useSearchParams } from 'react-router-dom';

export const useProductsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page') || 1);
  const perPage = searchParams.get('perPage') || 'all';

  const setSort = (value: string) => {
    const next = new URLSearchParams(searchParams);

    next.set('sort', value);
    next.delete('page');
    setSearchParams(next);
  };

  const setPerPage = (value: string) => {
    const next = new URLSearchParams(searchParams);

    if (value === 'all') {
      next.delete('perPage');
    } else {
      next.set('perPage', value);
      next.delete('page');
      setSearchParams(next);
    }
  };

  const setPage = (newPage: number) => {
    const next = new URLSearchParams(searchParams);

    if (newPage === 1) {
      next.delete('page');
    } else {
      next.set('page', String(newPage));
      setSearchParams(next);
    }
  };

  return { sort, page, perPage, setSort, setPerPage, setPage };
};
