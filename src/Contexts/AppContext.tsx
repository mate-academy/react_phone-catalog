/* eslint-disable max-len */
import {
  createContext, useState, useCallback, useEffect,
} from 'react';
import { debounce } from 'lodash';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '../api/api';

import type { ProductType } from '../Types/ProductType';
import type { PhoneType } from '../Types/PhoneType';
import { CartItem } from '../Types/CartItem';

type Props = {
  children: React.ReactNode;
};

type AppContextType = {
  products: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  categoryProducts: ProductType[];
  setCategoryProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  visibleProducts: ProductType[];
  setVisibleProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  currentItem: PhoneType | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<PhoneType | null>>;
  searchParams: URLSearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  favorites: ProductType[];
  setFavorites: React.Dispatch<React.SetStateAction<ProductType[]>>;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const DefaultAppValues: AppContextType = {
  products: [],
  setProducts: () => null,
  categoryProducts: [],
  setCategoryProducts: () => null,
  visibleProducts: [],
  setVisibleProducts: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  searchParams: new URLSearchParams(),
  setSearchParams: () => null,
  favorites: [],
  setFavorites: () => null,
  cartItems: [],
  setCartItems: () => null,
};

export const appContext = createContext<AppContextType>(DefaultAppValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  const [currentItem, setCurrentItem] = useState<PhoneType | null>(null);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<ProductType[]>(
    'favorites',
    [],
  );

  const searchQuery = searchParams.get('query') || '';
  const perPage = searchParams.get('per-page') || '8';
  const sortBy = searchParams.get('sort-by') || 'year';
  const page = searchParams.get('page') || '1';

  const state: AppContextType = {
    products,
    setProducts,
    categoryProducts,
    setCategoryProducts,
    visibleProducts,
    setVisibleProducts,
    currentItem,
    setCurrentItem,
    searchParams,
    setSearchParams,
    favorites,
    setFavorites,
    cartItems,
    setCartItems,
  };

  const fetchData = useCallback(async () => {
    try {
      const data = await api.getNewPhones();

      if (data) {
        setProducts(data);
      }
    } catch {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const preparedVisibleProducts = products.filter(product => {
      return pathname.includes(product.category);
    });

    setCategoryProducts(preparedVisibleProducts);
  }, [products, pathname]);

  const sortProducts = (productsToSort: ProductType[], sortType: string) => {
    switch (sortType) {
      case 'year':
        return productsToSort.sort((a, b) => {
          const yearComparison = b.year - a.year;
          const priceComparison = b.price - a.price;

          return yearComparison !== 0 ? yearComparison : priceComparison;
        });
      case 'price':
        return productsToSort.sort((a, b) => a.price - b.price);
      case 'name':
        return productsToSort.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      default:
        return productsToSort;
    }
  };

  useEffect(() => {
    let preparedVisibleProducts = [...categoryProducts];

    const debouncedFilter = debounce((array: ProductType[]) => {
      let newArr = [...array];

      newArr = array.filter(product => {
        return product.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      });

      setVisibleProducts(newArr);
    }, 500);

    if (searchQuery) {
      setVisibleProducts([]);
      debouncedFilter(preparedVisibleProducts);

      return;
    }

    if (sortBy) {
      preparedVisibleProducts = sortProducts(preparedVisibleProducts, sortBy);
    } else {
      preparedVisibleProducts = sortProducts(preparedVisibleProducts, 'year');
    }

    if (perPage !== 'All') {
      const startIndex = (+page - 1) * +perPage;

      preparedVisibleProducts = preparedVisibleProducts.slice(
        startIndex,
        startIndex + +perPage,
      );
    }

    setVisibleProducts(preparedVisibleProducts);
  }, [perPage, searchQuery, page, sortBy, categoryProducts]);

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
