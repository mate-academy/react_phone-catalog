import { ItemsPerPageFields } from '@/types/ItemsPerPageFields';
import { Product } from '@/types/Product';
import { SortFields } from '@/types/SortFields';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePaginationParams } from './usePaginationParams';
import { PAGINATION_BUTTONS } from '../constants/pagination';

export const useProductsPagination = (products: Product[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { sort, perPage } = usePaginationParams();

  const itemsCount =
    perPage === ItemsPerPageFields.All ? products.length : +perPage;

  const totalPages = Math.ceil(products.length / itemsCount);

  const rawPage = Number(searchParams.get('page')) || 1;
  const page = Math.max(1, Math.min(totalPages, rawPage));

  const endIndex = itemsCount * page;
  const startIndex = endIndex - itemsCount;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const sortedProducts = useMemo(
    () =>
      [...products].sort((productA, productB) => {
        switch (sort) {
          case SortFields.Newest:
            return productB.year - productA.year;

          case SortFields.Alphabet:
            return productA.name.localeCompare(productB.name);

          case SortFields.Cheapest:
            return productA.price - productB.price;

          default:
            return 0;
        }
      }),
    [products, sort],
  );

  const slicedProducts = sortedProducts.slice(startIndex, endIndex);

  let start = Math.max(0, page - Math.round(PAGINATION_BUTTONS / 2));

  if (start + PAGINATION_BUTTONS > totalPages) {
    start = Math.max(0, totalPages - PAGINATION_BUTTONS);
  }

  const slicedPages = pages.slice(start, start + PAGINATION_BUTTONS);

  const updateSearchParams = (key: string, value: string) => {
    searchParams.set('page', '1');
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const handleSetPage = (newPage: number) => {
    if (newPage !== page) {
      scroll({ top: 0, behavior: 'smooth' });
    }

    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  const handlePrevPage = () => {
    scroll({ top: 0, behavior: 'smooth' });
    searchParams.set('page', String(Math.max(1, page - 1)));
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    scroll({ top: 0, behavior: 'smooth' });
    searchParams.set('page', String(Math.min(page + 1, totalPages)));
    setSearchParams(searchParams);
  };

  return {
    sort,
    perPage,
    slicedProducts,
    totalPages,
    slicedPages,
    page,
    updateSearchParams,
    handleSetPage,
    handlePrevPage,
    handleNextPage,
  };
};
