/* eslint-disable */
import React, { createContext, useEffect, useState } from 'react';
import { getProducts } from '../utils/fetchMethods';
import { Product } from '../types/ContextType/Product';
import { useLocation, useSearchParams } from 'react-router-dom';
import { filterGadgets } from '../utils/filterGadgets';
import { sortedBy } from '../utils/sortGadgets';
import { SortBy } from '../enums/SortBy';
import { QueryParams } from '../enums/QuryParams';
import { ItemsList } from '../enums/ItemsPerPage';
import { useDebounce } from 'use-debounce';

type ContextType = {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  products: Product[];
  setProducts: (v: Product[]) => void;
  gadgets: {
    gadgetsLen: number;
    gadgets: Product[];
  };
  resultFilteredDev: Product[];
};

export const ProductsContext = createContext<ContextType>({
  isLoading: false,
  setIsLoading: () => [],
  products: [],
  setProducts: () => {},
  gadgets: {
    gadgetsLen: 0,
    gadgets: [],
  },
  resultFilteredDev: [],
});

type Props = {
  children: React.ReactNode;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  const sortBy = searchParams.get(QueryParams.sort) || SortBy.newest;
  const page = searchParams.get(QueryParams.page) || '1';
  const perPage = searchParams.get(QueryParams.perPage) || '4';
  const query = searchParams.get(QueryParams.query) || '';
  const [debounceValue] = useDebounce(query, 500);

  const filteredGadgets = debounceValue
    ? products.filter(item =>
        item.name
          .toLocaleLowerCase()
          .includes(debounceValue.toLocaleLowerCase()),
      )
    : products;
  const gadgets = filterGadgets(pathname, filteredGadgets);
  const sortedGadgets = sortedBy(sortBy, gadgets.gadgets);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set(QueryParams.page, '1');
    setSearchParams(params);
  }, [perPage]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const devices = await getProducts('products');

        if (devices) {
          setProducts(devices);
        }
      } catch (error) {
        throw new Error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredList = (
    devices: Product[],
    currentPage: number,
    devicesPerPage = '4',
  ) => {
    const copyDevices = [...devices];

    if (devicesPerPage === ItemsList.all) {
      return copyDevices;
    } else {
      const entIndex = +devicesPerPage * currentPage;
      const startIndex = entIndex - +devicesPerPage;

      return copyDevices.slice(startIndex, entIndex);
    }
  };

  const resultFilteredDev = filteredList(sortedGadgets, +page, perPage);

  const gadgetsTools = {
    isLoading,
    setIsLoading,
    products,
    setProducts,
    gadgets,
    resultFilteredDev,
  };

  return (
    <ProductsContext.Provider value={gadgetsTools}>
      {children}
    </ProductsContext.Provider>
  );
};
