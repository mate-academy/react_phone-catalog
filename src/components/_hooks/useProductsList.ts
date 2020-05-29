import { useCallback, useMemo } from 'react';
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

  const page = Number(search.get('page')) || 1;
  const perPage = Number(search.get('perPage')) || searchedProducts.length;
  const indexOfLast = useMemo(() => page * perPage, [page, perPage]);
  const indexOfFirst = useMemo(() => indexOfLast - perPage, [indexOfLast, perPage]);

  const {
    numberOfProducts = 0,
    currentProducts = searchedProducts
  } = useMemo(() => {
    if (location.pathname === '/phones') {
      return {
        numberOfProducts : phones.length,
        currentProducts : phones.slice(indexOfFirst, indexOfLast),
      }
    } else {
      return {
        numberOfProducts : tablets.length,
        currentProducts : tablets.slice(indexOfFirst, indexOfLast),
      }
    }
  }, [phones, tablets, indexOfFirst, indexOfLast, location.pathname]);

  const changePage = (pageNumber: number) => {
    search.set('page', pageNumber.toString());

    history.push({
      search: search.toString(),
    });
  };

  const queryCondition = useCallback(() => {
    if (search.get('query')) {
      return 'result';
    }

    return 'model';
  }, [search]);

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
