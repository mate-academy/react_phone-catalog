import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/getSearchWith';
import { sortingProducts } from '../utils/sortingProducts';
import { SortType } from '../types/sortType';
import { useProducts } from './ProductContext';
import { Product } from '../types/Product';

type SearchParams = {
  sort?: string;
  perPage?: string;
  page?: string;
};

type Page = {
  sortBy: string;
  currentPage: number;
  handleSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCurrentPage: (currPage: number) => void;
  endItem: number;
  startItem: number;
  setSearchWith: (params: SearchParams) => void;
  sortedProducts: Product[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsOnPage: string;
};

export const PageContext = React.createContext<Page>({
  sortBy: 'age',
  currentPage: 1,
  handleSort: () => { },
  handlePerPage: () => { },
  handleCurrentPage: () => { },
  endItem: 0,
  startItem: 0,
  setSearchWith: () => { },
  sortedProducts: [],
  setCurrentPage: () => { },
  itemsOnPage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PageProvider: React.FC<Props> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const itemsPerPage = searchParams.get('perPage') || '8';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [sortBy, setSortBy] = useState(sort);
  const [itemsOnPage, setItemsOnPage] = useState(itemsPerPage);
  const [currentPage, setCurrentPage] = useState(page);
  const { products } = useProducts();

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  }

  const sortedProducts = useMemo(() => sortingProducts(products, sortBy),
    [products, sortBy]);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value as SortType;

    setSortBy(selectedSort);
    setSearchWith({ sort: event.target.value || undefined });
  };

  const getValidPerPageValue = (perPageValue: string) => {
    if (perPageValue === 'all') {
      return sortedProducts.length.toString();
    }

    return perPageValue;
  };

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const perPageValue = event.target.value;

    setItemsOnPage(getValidPerPageValue(perPageValue));

    setCurrentPage(1);
    setSearchWith({ perPage: event.target.value || undefined });
  };

  const handleCurrentPage = (currPage: number) => {
    if (currentPage !== currPage) {
      setCurrentPage(currPage);
    }

    setSearchWith({ page: currPage.toString() || undefined });
  };

  const onPage = +getValidPerPageValue(itemsOnPage);

  const startItem = ((currentPage - 1) * onPage);
  const endItem = (currentPage * onPage) > sortedProducts.length
    ? sortedProducts.length
    : startItem + onPage;

  return (
    <PageContext.Provider value={{
      sortBy,
      currentPage,
      handleSort,
      handlePerPage,
      handleCurrentPage,
      endItem,
      startItem,
      setSearchWith,
      sortedProducts,
      setCurrentPage,
      itemsOnPage,
    }}
    >
      {children}
    </PageContext.Provider>
  );
};
