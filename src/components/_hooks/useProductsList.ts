import { useCallback, useMemo } from 'react';
import { useSearch } from './useSearch';
import { LOCATIONS, PER_PAGE, PRODUCT_TYPES } from '../../common/constants';
import { useRouter } from './useRouter';

export const useProductsList = () => {
  const { searchedProducts } = useSearch();
  const { history, search, location } = useRouter();

  const phones = useMemo(() => {
    return searchedProducts.filter(product => product.type === PRODUCT_TYPES.phone);
  }, [searchedProducts]);

  const tablets = useMemo(() => {
    return searchedProducts.filter(product => product.type === PRODUCT_TYPES.tablet);
  }, [searchedProducts]);

  const searchPerPageCheck = search.get('perPage') === 'All'
    ? searchedProducts.length
    : search.get('perPage');

  const page = Number(search.get('page')) || 1;
  const perPage = Number(searchPerPageCheck) || Number(PER_PAGE[0].option);
  const indexOfLast = useMemo(() => page * perPage, [page, perPage]);
  const indexOfFirst = useMemo(() => indexOfLast - perPage, [indexOfLast, perPage]);

  const {
    numberOfProducts = 0,
    currentProducts = searchedProducts,
  } = useMemo(() => {
    if (location.pathname === LOCATIONS.phones) {
      return {
        numberOfProducts: phones.length,
        currentProducts: phones.slice(indexOfFirst, indexOfLast),
      };
    }

    return {
      numberOfProducts: tablets.length,
      currentProducts: tablets.slice(indexOfFirst, indexOfLast),
    };
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

    if (location.pathname === LOCATIONS.favorites) {
      return 'item';
    }

    return 'model';
  }, [search, location.pathname]);

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
