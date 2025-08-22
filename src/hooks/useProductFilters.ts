import { useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { itemId } = useParams<{ itemId?: string }>();

  const STORAGE_KEY_SEARCH = 'lastCategorySearch'; // для search параметров
  const STORAGE_KEY_PATH = 'lastCategoryPath';     // для пути категории

  // Сохраняем только страницы категорий (без itemId и без /cart или /favorites)





  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(location.pathname) ;
  }, []);

  console.log('-==location==-', location.pathname);
  console.log('-==path==-', path);


















  useEffect(() => {
    const isCategoryPage = !itemId && !location.pathname.startsWith('/cart') && !location.pathname.startsWith('/favorites');

    if (isCategoryPage) {
      if (location.search) {
        sessionStorage.setItem(STORAGE_KEY_SEARCH, location.search);
      }
      sessionStorage.setItem(STORAGE_KEY_PATH, location.pathname);
    }
  }, [location.pathname, location.search, itemId]);
  // console.log('-==location==-', location.pathname);

  const getLastSearch = () => sessionStorage.getItem(STORAGE_KEY_SEARCH) || '';
  const getLastPath = () => sessionStorage.getItem(STORAGE_KEY_PATH) || '/';

  const getSortParam = () => searchParams.get('sort') || '';
  const getPerPage = () => parseInt(searchParams.get('perPage') || '16', 10);
  const getPage = () => parseInt(searchParams.get('page') || '1', 10);

  const setSort = (value: string) => {
    searchParams.set('sort', value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const setPerPage = (value: number) => {
    searchParams.set('perPage', value.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const setPage = (value: number) => {
    searchParams.set('page', value.toString());
    setSearchParams(searchParams);
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
