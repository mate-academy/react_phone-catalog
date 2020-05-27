import { useMemo } from 'react';
import { useSearch } from './useSearch';

export const useProductsList = () => {
  const {
    searchedProducts, history, search, location,
  } = useSearch();

  const phones = useMemo(() => {
    return searchedProducts.filter(product => product.type === 'phone');
  }, [searchedProducts]);

  const tablets = useMemo(() => {
    return searchedProducts.filter(product => product.type === 'tablet');
  }, [searchedProducts]);

  let numberOfProducts = 0;
  let currentProducts = searchedProducts;

  const page = Number(search.get('page')) || 1;
  const perPage = Number(search.get('perPage')) || searchedProducts.length;
  const indexOfLast = page * perPage;
  const indexOfFirst = indexOfLast - perPage;

  if (location.pathname === '/phones') {
    numberOfProducts = phones.length;
    currentProducts = phones.slice(indexOfFirst, indexOfLast);
  }

  if (location.pathname === '/tablets') {
    numberOfProducts = tablets.length;
    currentProducts = tablets.slice(indexOfFirst, indexOfLast);
  }

  const changePage = (pageNumber: number) => {
    search.set('page', pageNumber.toString());

    history.push({
      search: search.toString(),
    });
  };

  const queryCondition = () => {
    if (search.get('query')) {
      return 'result';
    }

    return 'model';
  };

  return {
    currentProducts,
    numberOfProducts,
    changePage,
    queryCondition,
    perPage,
    page,
    search,
    phones,
    tablets,
    location,
  };
};
