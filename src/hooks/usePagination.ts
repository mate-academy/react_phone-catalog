import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MergedDevice } from '../types/devices';
import { updateSearchParamsWithDefaults } from '../utils/searchParamsUtils';

export const usePagination = (
  products: MergedDevice[],
  productPerPage: number,
  initialPage: number,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const safeProductPerPage =
    isNaN(productPerPage) || productPerPage <= 0
      ? products.length || 1
      : productPerPage;

  const totalPages = Math.ceil(
    products.length > 0 ? products.length / safeProductPerPage : 1,
  );

  const firstIndex = (currentPage - 1) * safeProductPerPage;
  const lastIndex = currentPage * safeProductPerPage;
  const visibleProducts = products.slice(firstIndex, lastIndex);

  const numbers =
    totalPages > 0 ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];

  useEffect(() => {
    if (totalPages && initialPage > totalPages) {
      setCurrentPage(1);
      updateSearchParamsWithDefaults(
        { page: '1' },
        searchParams,
        setSearchParams,
      );
    }
  }, [initialPage, totalPages]);

  useEffect(() => {
    const pageFromURL = searchParams.get('page');
    const page = pageFromURL ? parseInt(pageFromURL, 10) : 1;

    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams]);

  const syncPageToURL = (page: number) => {
    updateSearchParamsWithDefaults(
      { page: page.toString() },
      searchParams,
      setSearchParams,
    );
  };

  useEffect(() => {
    const maxPage = Math.ceil(products.length / safeProductPerPage);

    if (currentPage > maxPage) {
      setCurrentPage(1);
      syncPageToURL(1);
    }
  }, [products.length]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      const next = currentPage + 1;

      setCurrentPage(next);
      syncPageToURL(next);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const prev = currentPage - 1;

      setCurrentPage(prev);
      syncPageToURL(prev);
    }
  };

  const changeCurrentPage = (id: number) => {
    if (id >= 1 && id <= totalPages) {
      setCurrentPage(id);
      syncPageToURL(id);
    }
  };

  return {
    nextPage,
    prevPage,
    currentPage,
    changeCurrentPage,
    numbers,
    visibleProducts,
    totalPages,
  };
};
