import { useMemo, useEffect, useCallback } from 'react';
import {
  useOutletContext,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { ContextProps } from '../../types/ContextProps';
import { scrollToTop } from '../shared/utils/scrollUtils';
import { getSortedProducts, getVisibleProducts } from './catalogHelpers';

export const useCatalog = () => {
  const { categories, products: allProducts } =
    useOutletContext<ContextProps>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const currentCategory = useMemo(
    () => categories.find(c => pathname.endsWith(c.path)),
    [categories, pathname],
  );

  const categoryProducts = useMemo(
    () =>
      currentCategory
        ? allProducts.filter(p => p.category === currentCategory.id)
        : [],
    [allProducts, currentCategory],
  );

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const sortedProducts = useMemo(
    () => getSortedProducts(categoryProducts, sort),
    [categoryProducts, sort],
  );

  const visibleProducts = useMemo(
    () => getVisibleProducts(sortedProducts, currentPage, perPage),
    [sortedProducts, currentPage, perPage],
  );

  const totalPages = Math.ceil(
    sortedProducts.length /
      (perPage === 'all' ? sortedProducts.length : Number(perPage)),
  );
  const isPaginationVisible =
    perPage !== 'all' && sortedProducts.length > Number(perPage);

  const handleParamChange = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (
        value === 'all' ||
        (name === 'page' && value === '1') ||
        (name === 'sort' && value === 'age')
      ) {
        newParams.delete(name);
      } else {
        newParams.set(name, value);
      }

      if (name !== 'page') {
        newParams.delete('page');
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    scrollToTop();
  }, [currentPage, sort, perPage, currentCategory]);

  return {
    currentCategory,
    categoryProducts,
    visibleProducts,
    sort,
    perPage,
    currentPage,
    totalPages,
    isPaginationVisible,
    handleParamChange,
  };
};
