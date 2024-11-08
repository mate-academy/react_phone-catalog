import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchWith } from '@utils/helpers/searchHelpers';
import { applySorting } from '@utils/helpers/sortByOptions';
import { IPagination } from '@utils/types/pagination.interface';
import { TProduct } from '@utils/types/product.type';

type PaginationProps = {
  products: TProduct[];
  initialPerPage: number;
};
const DEFAULT_SORT_PARAM = 'year';

export const usePagination = ({
  products,
  initialPerPage,
}: PaginationProps): IPagination => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isProductsEmpty = products.length === 0;
  const initialPage = Number(searchParams.get('page')) || 1;
  const sortParam = searchParams.get('sort') || DEFAULT_SORT_PARAM;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemPerPage, setItemPerPage] = useState(initialPerPage);

  const sortedProducts = useMemo(
    () => applySorting(products, sortParam),
    [products, sortParam],
  );

  const maxPage = useMemo(() => {
    if (isProductsEmpty) return 1;

    return Math.max(1, Math.ceil(sortedProducts.length / itemPerPage));
  }, [sortedProducts.length, itemPerPage, isProductsEmpty]);

  useEffect(() => {
    const newSearch = getSearchWith(
      {
        page: currentPage > 1 ? currentPage : null,
        perPage: itemPerPage !== products.length ? itemPerPage : null,
        sort: sortParam !== 'year' ? sortParam : null,
      },
      searchParams,
    );

    setSearchParams(newSearch, { replace: true });
  }, [currentPage, itemPerPage, sortParam, setSearchParams]);

  const currentProducts = useMemo(() => {
    if (isProductsEmpty) return [];

    return sortedProducts.slice(
      (currentPage - 1) * itemPerPage,
      Math.min(currentPage * itemPerPage, sortedProducts.length),
    );
  }, [sortedProducts, currentPage, itemPerPage, isProductsEmpty]);

  const handlePageChange = useCallback(
    (delta: number) => {
      setCurrentPage(prevPage =>
        Math.min(maxPage, Math.max(1, prevPage + delta)),
      );
    },
    [maxPage],
  );

  return {
    currentProducts,
    currentPage,
    itemPerPage,
    isVisible: maxPage > 1,
    setCurrentPage,
    setItemPerPage,
    handlePageChange,
    isPrevDisabled: currentPage <= 1,
    isNextDisabled: currentPage >= maxPage,
  };
};
