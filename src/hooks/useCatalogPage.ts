import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useProducts } from './useProducts';
import type { ProductCategory, ProductFromServer } from '../types/product';

export const SORT_OPTION_VALUES = ['age', 'name', 'price'] as const;
export const PER_PAGE_OPTION_VALUES = ['4', '8', '16', 'all'] as const;

const DEFAULT_SORT = 'age';
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 'all';

const getValidSort = (value: string | null): string => {
  if (!value) {
    return DEFAULT_SORT;
  }

  const isValid = SORT_OPTION_VALUES.includes(
    value as (typeof SORT_OPTION_VALUES)[number],
  );

  return isValid ? value : DEFAULT_SORT;
};

const getValidPerPage = (value: string | null): string => {
  if (!value) {
    return DEFAULT_PER_PAGE;
  }

  const isValid = PER_PAGE_OPTION_VALUES.includes(
    value as (typeof PER_PAGE_OPTION_VALUES)[number],
  );

  return isValid ? value : DEFAULT_PER_PAGE;
};

const getValidPage = (value: string | null): number => {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return DEFAULT_PAGE;
  }

  return page;
};

const getProductVisiblePrice = (
  product: ProductFromServer,
  latestProductYear: number,
) => {
  return product.year === latestProductYear ? product.fullPrice : product.price;
};

export const useCatalogPage = (category: ProductCategory) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, hasError } = useProducts();

  const sortBy = getValidSort(searchParams.get('sort'));
  const perPage = getValidPerPage(searchParams.get('perPage'));
  const currentPage = getValidPage(searchParams.get('page'));
  const query = searchParams.get('query')?.trim().toLowerCase() || '';

  const categoryProducts = useMemo(() => {
    return products.filter(product => product.category === category);
  }, [products, category]);

  const latestProductYear = useMemo(() => {
    if (categoryProducts.length === 0) {
      return 0;
    }

    return Math.max(...categoryProducts.map(product => product.year));
  }, [categoryProducts]);

  const searchedProducts = useMemo(() => {
    if (!query) {
      return categoryProducts;
    }

    return categoryProducts.filter(product => {
      const searchableText = [
        product.name,
        product.screen,
        product.capacity,
        product.ram,
        product.color,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [categoryProducts, query]);

  const sortedProducts = useMemo(() => {
    return [...searchedProducts].sort((productA, productB) => {
      switch (sortBy) {
        case 'name':
          return productA.name.localeCompare(productB.name);

        case 'price': {
          const priceA = getProductVisiblePrice(productA, latestProductYear);
          const priceB = getProductVisiblePrice(productB, latestProductYear);

          return priceA - priceB;
        }

        case 'age':
        default:
          return productB.year - productA.year;
      }
    });
  }, [searchedProducts, sortBy, latestProductYear]);

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  const totalPages =
    perPage === 'all' || sortedProducts.length === 0
      ? 1
      : Math.ceil(sortedProducts.length / itemsPerPage);

  const safeCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage <= totalPages) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (totalPages <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(totalPages));
    }

    setSearchParams(params);
  }, [currentPage, totalPages, searchParams, setSearchParams]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, safeCurrentPage, itemsPerPage, perPage]);

  const updateSearchParams = ({
    sort,
    page,
    nextPerPage,
  }: {
    sort?: string;
    page?: number;
    nextPerPage?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    const nextSort = sort ?? sortBy;
    const nextPage = page ?? safeCurrentPage;
    const updatedPerPage = nextPerPage ?? perPage;

    if (nextSort === DEFAULT_SORT) {
      params.delete('sort');
    } else {
      params.set('sort', nextSort);
    }

    if (nextPage === DEFAULT_PAGE) {
      params.delete('page');
    } else {
      params.set('page', String(nextPage));
    }

    if (updatedPerPage === DEFAULT_PER_PAGE) {
      params.delete('perPage');
    } else {
      params.set('perPage', updatedPerPage);
    }

    setSearchParams(params);
  };

  const handleSortChange = (nextSortBy: string) => {
    updateSearchParams({
      sort: nextSortBy,
      page: DEFAULT_PAGE,
    });
  };

  const handlePerPageChange = (nextPerPage: string) => {
    updateSearchParams({
      nextPerPage,
      page: DEFAULT_PAGE,
    });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page });
  };

  const shouldShowPagination =
    searchedProducts.length > 0 && perPage !== 'all' && totalPages > 1;

  return {
    isLoading,
    hasError,
    sortBy,
    perPage,
    safeCurrentPage,
    totalPages,
    latestProductYear,
    categoryProducts,
    searchedProducts,
    visibleProducts,
    shouldShowPagination,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  };
};
