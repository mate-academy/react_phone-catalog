import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const perPageParam = searchParams.get('perPage');
  const sortParam = searchParams.get('sort') as SortBy | null;

  const page = pageParam ? Number(pageParam) : 1;
  const perPage: number | 'all' =
    perPageParam && perPageParam !== 'all' ? Number(perPageParam) : 'all';
  const sortBy: SortBy = sortParam ?? 'newest';

  // --- Write ---
  const setPage = (newPage: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if (newPage === 1) {
        next.delete('page');
      } else {
        next.set('page', String(newPage));
      }

      return next;
    });
  };

  const setPerPage = (value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if (value === 'all') {
        next.delete('perPage');
      } else {
        next.set('perPage', value);
      }

      next.delete('page');

      return next;
    });
  };

  const setSortBy = (value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      if (value === 'newest') {
        next.delete('sort');
      } else {
        next.set('sort', value);
      }

      next.delete('page');

      return next;
    });
  };

  return {
    // values
    page,
    perPage,
    sortBy,
    // raw params (needed for Dropdown controlled value)
    perPageParam,
    sortParam,
    // setters
    setPage,
    setPerPage,
    setSortBy,
  };
}
