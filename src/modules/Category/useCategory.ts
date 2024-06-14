import { useSearchParams } from 'react-router-dom';
import { useProducts, SELECT_CATEGORY } from '../../app/features/products';
import { getInRange } from '../../utils/getInRange';
import { getValidOption } from '../../utils/getValidOption';
import { filterProducts } from '../../utils/filterProducts';
import { Category } from '../../types';
import { getHandleSortChange } from './utils/getHandleSortChange';
import { getSelectPage } from './utils/getSelectPage';
import { sortProducts } from './utils/sortProducts';
import { getHandleTakeChange } from './utils/getHandleTakeChange';
import {
  QUERY_KEY,
  SORT_SELECT_OPTIONS,
  sortSelectDefaultOption,
  TAKE_SELECT_OPTIONS,
  takeSelectDefaultOption,
} from './variables';
import { getSetSearchQuery } from './utils/getSetSearchQuery';
import { useMemo } from 'react';

export const useCategory = (category: Category) => {
  const { products, status } = useProducts(SELECT_CATEGORY[category]);
  const [searchParams, setSearchParams] = useSearchParams();

  const takeOption = getValidOption(
    TAKE_SELECT_OPTIONS,
    searchParams.get(QUERY_KEY.TAKE) || '',
    takeSelectDefaultOption,
  );
  const sortOption = getValidOption(
    SORT_SELECT_OPTIONS,
    searchParams.get(QUERY_KEY.SORT) || '',
    sortSelectDefaultOption,
  );
  const searchQueryParam = searchParams.get(QUERY_KEY.SEARCH) || '';

  const filteredProducts = useMemo(
    () => filterProducts(products, searchQueryParam),
    [products, searchQueryParam],
  );

  const take = Math.min(+takeOption.value, filteredProducts.length);
  const numberOfPages = Math.ceil(filteredProducts.length / take);
  const page = getInRange(
    Number(searchParams.get(QUERY_KEY.PAGE) || '') || 1,
    1,
    numberOfPages,
  );

  const preparedProducts = sortProducts(
    filteredProducts,
    sortOption.value,
  ).slice((page - 1) * take, page * take);

  const setSearchQuery = getSetSearchQuery(
    setSearchParams,
    searchParams,
    QUERY_KEY.SEARCH,
    { [QUERY_KEY.PAGE]: null },
  );

  const selectPage = getSelectPage(
    setSearchParams,
    searchParams,
    QUERY_KEY.PAGE,
    numberOfPages,
  );

  const handleTakeChange = getHandleTakeChange(
    setSearchParams,
    searchParams,
    QUERY_KEY.TAKE,
    { [QUERY_KEY.PAGE]: null },
  );

  const handleSortChange = getHandleSortChange(
    setSearchParams,
    searchParams,
    QUERY_KEY.SORT,
  );

  return {
    setSearchQuery,
    selectPage,
    handleTakeChange,
    handleSortChange,
    preparedProducts,
    status,
    filteredProducts,
    sortOption,
    takeOption,
    numberOfPages,
    page,
    searchQueryParam,
  };
};
