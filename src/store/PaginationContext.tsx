import React, { useContext, useEffect, useMemo } from 'react';
import { getSearchWith } from '../utils/helpers/searchHelper';
import { SelectOptions } from '../types/selectType';
import { paginationOptions } from '../shared/ui/Select/data/selectData';
import { useFilters } from './FiltersContext';
import { PaginationContextType } from '../types/PaginationContextType';
import { useLocation } from 'react-router-dom';

export const PaginationContext =
  React.createContext<PaginationContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export const PaginationProvider: React.FC<Props> = ({ children }) => {
  const filters = useFilters();
  const location = useLocation();

  const itemsPerPage = useMemo(() => {
    const sortParam = filters.searchParams.get('perPage');

    return (
      paginationOptions.find(option => option.value.toString() === sortParam) ||
      paginationOptions[2]
    );
  }, [filters.searchParams]);

  const page = filters.searchParams.get('page') as string | null;

  const getUrlWith = (p: number) => {
    const pathname = location.pathname;

    return (
      pathname +
      '?' +
      getSearchWith(
        filters.searchParams,
        p === 0
          ? {}
          : {
              page: p.toString(),
            },
      )
    );
  };

  const onPageChange = (p: number) => {
    filters.setSearchWith({ page: p.toString() });
  };

  const total = filters.productCard.length;
  const currentPage = page ? Number(page) : 1;
  const maxVisiblePages = 5;
  const totalPageCount = Math.ceil(total / Number(itemsPerPage?.value));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const paginatedItems = useMemo(() => {
    if (itemsPerPage?.value === 'all') {
      return filters.productCard;
    }

    if (itemsPerPage === undefined) {
      return [];
    }

    const itemsCount = itemsPerPage.value as number;
    const startIndex = (currentPage - 1) * itemsCount;
    const endIndex = startIndex + itemsCount;

    return filters.productCard.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, filters.productCard]);

  const visiblePages = useMemo(() => {
    const pages: (string | number)[] = [];

    if (totalPageCount < maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        pages.push(i);
      }

      return pages;
    }

    const visibleCount = maxVisiblePages - 2;
    let leftPage = currentPage - Math.floor((visibleCount - 1) / 2);
    let rightPage = currentPage + Math.ceil((visibleCount - 1) / 2);

    if (leftPage < 2) {
      rightPage += 2 - leftPage;
      leftPage = 2;
    }

    if (rightPage > totalPageCount - 1) {
      leftPage -= rightPage - (totalPageCount - 1);
      rightPage = totalPageCount - 1;
    }

    if (!pages.includes(1)) {
      pages.push(1);
    }

    if (leftPage > 3) {
      pages.push('...');
    }

    for (let i = leftPage; i <= rightPage; i++) {
      pages.push(i);
    }

    if (rightPage < totalPageCount - 1) {
      pages.push('...');
    }

    if (!pages.includes(totalPageCount)) {
      pages.push(totalPageCount);
    }

    return pages;
  }, [currentPage, totalPageCount, maxVisiblePages]);

  const handlePaginationChange = (option: SelectOptions) => {
    filters.setSearchWith({ perPage: option.value.toString() });
  };

  return (
    <PaginationContext.Provider
      value={{
        paginatedItems,
        currentPage,
        itemsPerPage,
        onPageChange,
        handlePaginationChange,
        visiblePages,
        getUrlWith,
        totalPageCount,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginate = () => {
  const paginate = useContext(PaginationContext) as PaginationContextType;

  return paginate;
};
