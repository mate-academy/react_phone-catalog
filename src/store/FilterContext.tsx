/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { SetURLSearchParams, useSearchParams } from 'react-router-dom';
import { ProductType } from '../modules/shared/types/ProductType';
import { useDebounce } from '../modules/shared/hooks/Debounce';

type FilterContextType = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  getSearchWith: (params: Params, search?: string | URLSearchParams) => string;
  setSearchWith: (params: Params) => void;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filter: string;
  handlePerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  getNumbers: (from: number, to: number) => number[];
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  handlePageChange: (page: number) => void;
  filterValues: string[];
  sortProducts: (items: ProductType[], filterValue: string) => ProductType[];

  searchQuery: string;
  debouncedSearchQuery: string;
  handleSearchChange: (query: string) => void;
};

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

export const FilterContext = React.createContext<FilterContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('filter') || 'All';
  const searchQuery = searchParams.get('query') || '';

  const initialPage = Number(searchParams.get('page')) || 1;
  const initialPerPage = Number(searchParams.get('perPage')) || 4;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterValues = ['Newest', 'Cheapest', 'Alphabetically'];

  function getSearchWith(params: Params, search?: string | URLSearchParams) {
    const newParams = new URLSearchParams(search);

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);
        value.forEach(item => newParams.append(key, item.toString()));
      } else {
        newParams.set(key, value.toString());
      }
    }

    return newParams.toString();
  }

  function setSearchWith(params: Params) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  function sortProducts(
    items: ProductType[],
    filterValue: string,
  ): ProductType[] {
    if (filterValue === 'Newest') {
      return items.sort((a: ProductType, b: ProductType) => b.year - a.year);
    } else if (filterValue === 'Alphabetically') {
      return items.sort((a: ProductType, b: ProductType) =>
        a.name.localeCompare(b.name),
      );
    } else if (filterValue === 'Cheapest') {
      return items.sort((a: ProductType, b: ProductType) => a.price - b.price);
    } else {
      return items;
    }
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSearchWith({ filter: event.target.value || null });
  }

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  function handleSearchChange(query: string) {
    setSearchWith({ query: query || null });
  }

  useEffect(() => {
    const query = searchParams.get('query') || '';

    handleSearchChange(query);
  }, [searchParams]);
  useEffect(() => {
    setSearchWith({ page: String(currentPage) });
  }, [currentPage]);

  useEffect(() => {
    setSearchWith({ perPage: String(itemsPerPage) });
  }, [itemsPerPage]);
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  function getNumbers(from: number, to: number): number[] {
    const numbers = [];

    for (let n = from; n <= to; n += 1) {
      numbers.push(n);
    }

    return numbers;
  }

  const value = {
    filter,
    searchParams,
    setSearchParams,
    searchQuery,
    debouncedSearchQuery,
    handleSearchChange,
    getSearchWith,
    setSearchWith,
    handleFilterChange,
    handlePerPageChange,
    getNumbers,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handlePageChange,
    filterValues,
    sortProducts,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a FilterProvider');
  }

  return context;
};
