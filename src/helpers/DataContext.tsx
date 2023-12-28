/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getDetails, getPhones } from './api';
import { Product } from '../types/Product';
import { ContextType } from '../types/ContextType';
import { DropdownIterface, Option } from '../types/sortENUM';
import { SortProducts } from './sortFunctions';
import { ProductDetailsType } from '../types/ProductDetailsType';

export const DataContext = React.createContext<ContextType>({
  products: null,
  setProducts: () => { },
  setCurrentOption: () => '',
  sortDropdown: {
    name: '',
    options: {},
    isOpen: false,
  },
  perPageDropdown: {
    name: '',
    options: {},
    isOpen: false,
  },
  sort: '',
  perPage: '16',
  productDetails: null,
  setProductsDetails: () => { },
  favouriteProducts: null,
  setFavouriteProducts: () => { },
  pageURL: null,
  query: '',
});

export const useData = (): ContextType => React.useContext(DataContext);

type Props = {
  children: React.ReactNode;
};

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [productDetails, setProductsDetails] = useState<ProductDetailsType | null>(null);
  const [favouriteProducts, setFavouriteProducts] = useState<string[] | null>(null);

  const sort = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const query = searchParams.get('query') || '';
  const pageURL = pathname;

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    getPhones()
      .then(data => setProducts(SortProducts(data, sort, query)));
  }, [sort, query]);

  useEffect(() => {
    if (pageURL.includes('/phones/')) {
      const phoneId = pageURL.split('/').slice(-1).join('');

      getDetails(phoneId)
        .then(data => setProductsDetails(data));
    }
  }, [pageURL]);

  function setCurrentOption(options: Option, currentValue: string): string {
    const foundKey = Object.keys(options).find(
      key => options[key] === currentValue,
    );

    return foundKey || '';
  }

  const sortDropdown: DropdownIterface = {
    name: 'sort',
    options: {
      Year: 'age',
      Name: 'name',
      Price: 'price',
    },
    isOpen: false,
  };

  const perPageDropdown: DropdownIterface = {
    name: 'perPage',
    options: {
      4: '4',
      8: '8',
      16: '16',
      All: 'all',
    },
    isOpen: false,
  };

  return (
    <DataContext.Provider
      value={{
        products,
        setProducts,
        setCurrentOption,
        sortDropdown,
        perPageDropdown,
        sort,
        perPage,
        productDetails,
        setProductsDetails,
        favouriteProducts,
        setFavouriteProducts,
        pageURL,
        query,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
