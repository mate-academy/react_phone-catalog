import { useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { itemId } = useParams<{ itemId?: string }>();

  const STORAGE_KEY_SEARCH = 'lastCategorySearch';
  const STORAGE_KEY_PATH = 'lastCategoryPath';

  useEffect(() => {
    const isCategoryPage =
      !itemId &&
      !location.pathname.startsWith('/cart') &&
      !location.pathname.startsWith('/favourites');

    if (isCategoryPage) {
      if (location.search) {
        sessionStorage.setItem(STORAGE_KEY_SEARCH, location.search);
      }

      sessionStorage.setItem(STORAGE_KEY_PATH, location.pathname);
    }
  }, [location.pathname, location.search, itemId]);

  const getLastSearch = () => sessionStorage.getItem(STORAGE_KEY_SEARCH) || '';
  const getLastPath = () => sessionStorage.getItem(STORAGE_KEY_PATH) || '/';

  const getSortParam = () => searchParams.get('sort') || '';
  const getPerPage = () => parseInt(searchParams.get('perPage') || '16', 10);
  const getPage = () => parseInt(searchParams.get('page') || '1', 10);

  const setSort = (value: string) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('sort', value);
      params.set('page', '1');

      return params;
    });
  };

  const setPerPage = (value: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('perPage', value.toString());
      params.set('page', '1');

      return params;
    });
  };

  const setPage = (value: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', value.toString());

      return params;
    });
  };

  return {
    getSortParam,
    getPerPage,
    getPage,
    setSort,
    setPerPage,
    setPage,
    getLastSearch,
    getLastPath,
  };
};
