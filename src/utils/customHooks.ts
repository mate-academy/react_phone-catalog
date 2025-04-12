import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchParams } from '../types/SearchParams';
import { useAppSelector } from "../app/hooks";

export interface ProductNumber {
  [key: string]: number;
}

export function useLocaleStorage<T>(
  key: string,
  startValue: T,
): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);
    if (data === null) {
      localStorage.setItem(key, JSON.stringify(startValue));
      return startValue;
    }
    try {
      return JSON.parse(data);
    } catch {
      return startValue;
    }
  });
  const save = (newValue: T) => {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };
  return [value, save];
}

export function useCatalogSearchParams(itemsNumber: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'newest';
  const itemsOnPageRaw = searchParams.get('itemsOnPage') || 'all';
  const itemsOnPage = itemsOnPageRaw === 'all' ? Infinity : +itemsOnPageRaw;

  const totalPages = Math.ceil(itemsNumber / itemsOnPage);

  const activePageNumber = +(searchParams.get('activePageNumber') || '1');
  const firstVisiblePage = +(searchParams.get('firstVisiblePage') || '1');
  const lastVisiblePage = totalPages < 4 ? totalPages : firstVisiblePage + 3;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(firstVisiblePage - 1, lastVisiblePage);

  const updateParams = (params: Partial<SearchParams>) => {
    const newParams = new URLSearchParams(searchParams);
    const shouldReset = 'sortBy' in params || 'itemsOnPage' in params;

    if (shouldReset) {
      const keysToDelete = Array.from(newParams.keys()).filter(
        key => key !== 'sortBy' && key !== 'itemsOnPage',
      );
      keysToDelete.forEach(key => newParams.delete(key));
    }

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        newParams.set(key, value);
      }
    }

    setSearchParams(newParams);
  };

  return {
    searchParams,
    itemsOnPageRaw,
    itemsOnPage,
    sortBy,
    totalPages,
    visiblePages,
    activePageNumber,
    firstVisiblePage,
    lastVisiblePage,
    updateParams,
  };
}

export const useScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);
};

export const useProductNumbers = (): ProductNumber => {
  const products = useAppSelector(state => state.products.products);

  return {
    phones: products.filter(p => p.category === 'phones').length,
    tablets: products.filter(p => p.category === 'tablets').length,
    accessories: products.filter(p => p.category === 'accessories').length,
  };
};
