import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_SORT_VALUE,
  INITIAL_PAGE,
  DEFAULT_ITEMS_PER_PAGE,
} from '../types/Constants';
import { setSearchWith } from '../utils/paramsFunctions';
import { useCallback } from 'react';

export const useCatalogParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('page')) || INITIAL_PAGE;
  const sort = searchParams.get('sortBy') || DEFAULT_SORT_VALUE;
  const productsPerPage = searchParams.get('perPage') || DEFAULT_ITEMS_PER_PAGE;

  const handleSortValueChange = useCallback(
    (event: string) => {
      setSearchWith(
        {
          sortBy: event === DEFAULT_SORT_VALUE ? null : event,
          page: null,
        },
        searchParams,
        setSearchParams,
      );
    },
    [searchParams, setSearchParams],
  );

  const handleProductsPerPageChange = useCallback(
    (event: string) => {
      setSearchWith(
        {
          perPage: event === DEFAULT_ITEMS_PER_PAGE ? null : event,
          page: null,
        },
        searchParams,
        setSearchParams,
      );
    },
    [searchParams, setSearchParams],
  );

  const handleSetCurrentPage = useCallback(
    (event: number) => {
      setSearchWith(
        { page: event === INITIAL_PAGE ? null : event },
        searchParams,
        setSearchParams,
      );
    },
    [searchParams, setSearchParams],
  );

  return {
    handleSortValueChange,
    handleProductsPerPageChange,
    handleSetCurrentPage,
    pageNumber,
    sort,
    productsPerPage,
  };
};
