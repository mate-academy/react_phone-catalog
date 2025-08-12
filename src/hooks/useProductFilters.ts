import { useSearchParams, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { itemId } = useParams<{ itemId?: string }>();

  const STORAGE_KEY = 'lastCategorySearch'; // один ключ для всех категорий

  // 📌 1. Сохраняем search-параметры, если мы на странице категории (а не товара)
  useEffect(() => {
    const isCategoryPage = !itemId; // если нет itemId, значит список товаров
    if (isCategoryPage && location.search) {
      sessionStorage.setItem(STORAGE_KEY, location.search);
    }
  }, [location.search, itemId]);

  // 📌 2. Получаем сохранённые параметры
  const getLastSearch = () => sessionStorage.getItem(STORAGE_KEY) || '';

  // --- Методы работы с фильтрами ---
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
    getLastSearch, // теперь можно добавлять сохранённые search к ссылкам
  };
};

