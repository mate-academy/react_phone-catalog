import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import {
  DEFAULT_SORT_BY,
  DEFAULT_PAGE,
  DEFAULT_ITEMS_PER_PAGE,
} from '../utils/constants';

interface UseProductFilteringResult {
  currentSortBy: string;
  currentPerPage: string;
  currentPage: number;
  searchQuery: string;
  setSortBy: (sortBy: string) => void;
  setPerPage: (perPage: string) => void;
  setCurrentPage: (page: number) => void;
  filteredProducts: Product[];
  paginatedProducts: Product[];
  totalProducts: number;
  totalPages: number;
}

export const useProductFiltering = (
  products: Product[] | null,
  initialSearchQuery: string = '',
): UseProductFilteringResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Отримуємо параметри з URL або встановлюємо значення за замовчуванням
  const currentSortBy = searchParams.get('sortBy') || DEFAULT_SORT_BY;
  const currentPerPage = searchParams.get('perPage') || DEFAULT_ITEMS_PER_PAGE;
  const currentPage = Number(searchParams.get('page') || DEFAULT_PAGE);

  // Використовуємо initialSearchQuery як джерело правди для пошукового запиту
  const searchQuery = initialSearchQuery.toLowerCase();

  // Функції для оновлення URL-параметрів
  const updateSearchParams = (key: string, value: string | number | null) => {
    setSearchParams(
      prevParams => {
        const newParams = new URLSearchParams(prevParams);
        const prevValue = prevParams.get(key);

        const nextValue = value === null || value === '' ? null : String(value);

        // 1. Якщо значення не змінилося — нічого не робимо
        if ((prevValue ?? null) === nextValue) {
          return prevParams;
        }

        // 2. Встановлення / видалення ключа
        if (nextValue === null) {
          newParams.delete(key);
        } else {
          newParams.set(key, nextValue);
        }

        // 3. ❗️Скидаємо page ТІЛЬКИ якщо змінюється НЕ page
        if (key !== 'page') {
          newParams.delete('page');
        }

        return newParams;
      },
      { replace: true },
    );
  };

  const setSortBy = (sortBy: string) => updateSearchParams('sortBy', sortBy);
  const setPerPage = (perPage: string) =>
    updateSearchParams('perPage', perPage);
  const setCurrentPage = (page: number) => updateSearchParams('page', page);

  // Логіка фільтрації та сортування
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    let result = [...products];

    // 1. Пошук
    if (searchQuery) {
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.itemId.toLowerCase().includes(searchQuery), // Можливо, інші поля
      );
    }

    // 2. Сортування
    result.sort((a, b) => {
      switch (currentSortBy) {
        case 'newest':
          return b.year - a.year;

        case 'alphabetically':
          return a.name.localeCompare(b.name);

        case 'cheapest':
          return a.price - b.price;

        default:
          return 0;
      }
    });

    return result;
  }, [products, currentSortBy, searchQuery]);

  // Логіка пагінації
  const totalProducts = filteredAndSortedProducts.length;
  const itemsPerPageNum =
    currentPerPage === 'all' ? totalProducts : Number(currentPerPage);
  const totalPages = Math.ceil(totalProducts / itemsPerPageNum);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPageNum;
    const endIndex = startIndex + itemsPerPageNum;

    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, itemsPerPageNum]);

  return {
    currentSortBy,
    currentPerPage,
    currentPage,
    searchQuery,
    setSortBy,
    setPerPage,
    setCurrentPage,
    filteredProducts: filteredAndSortedProducts, // Потрібно для getTotalItems
    paginatedProducts,
    totalProducts,
    totalPages,
  };
};
