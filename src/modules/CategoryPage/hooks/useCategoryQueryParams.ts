import { useSearchParams } from 'react-router-dom';

export type SortType = 'age' | 'title' | 'price';
export type PerPageValue = '4' | '8' | '16' | 'all';

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE: PerPageValue = 'all';

export function useCategoryQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get('sort') as SortType) || null;
  const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
  const perPage =
    (searchParams.get('perPage') as PerPageValue) || DEFAULT_PER_PAGE;

  const setParam = (key: string, value: string, defaultValue: string) => {
    setSearchParams(current => {
      const next = new URLSearchParams(current);

      if (value === defaultValue) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      return next;
    });
  };

  const setSort = (value: SortType) => {
    setSearchParams(current => {
      const next = new URLSearchParams(current);

      next.set('sort', value);
      next.delete('page');

      return next;
    });
  };

  const setPage = (value: number) =>
    setParam('page', String(value), String(DEFAULT_PAGE));

  const setPerPage = (value: PerPageValue) => {
    setSearchParams(current => {
      const next = new URLSearchParams(current);

      if (value === DEFAULT_PER_PAGE) {
        next.delete('perPage');
      } else {
        next.set('perPage', value);
      }

      next.delete('page');

      return next;
    });
  };

  return { sort, page, perPage, setSort, setPage, setPerPage };
}
