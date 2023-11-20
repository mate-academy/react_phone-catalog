import {
  createContext, useState, useCallback, useEffect,
} from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '../api/api';

import type { ProductType } from '../Types/ProductType';
import type { PhoneType } from '../Types/PhoneType';
import { CartItem } from '../Types/CartItem';

type Props = {
  children: React.ReactNode;
};

type DefaultAppType = {
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

export type OptionPaginationType = { value: string; label: string };
export type OptionSortType = {
  value: string;
  label: string;
};

const DefaultAppValues: DefaultAppType = {
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

export const appContext = createContext<DefaultAppType>(DefaultAppValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const params = useLocation();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<ProductType[]>([]);
  const [currentItem, setCurrentItem] = useState<PhoneType | null>(null);
  const [favorites, setFavorites] = useLocalStorage<ProductType[]>(
    'favorites',
    [],
  );
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('per-page');
  const sortBy = searchParams.get('sort-by');

  const state: DefaultAppType = {
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

      if (!data) {
        return;
      }

      setProducts(data);
    } catch {
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let preparedVisibleProducts = [...products];

    if (params) {
      preparedVisibleProducts = preparedVisibleProducts.filter(product => {
        return params.pathname.includes(product.category);
      });
    }

    setCategoryProducts(preparedVisibleProducts);
  }, [products, params]);

  useEffect(() => {
    let preparedVisibleProducts = [...categoryProducts];

    if (sortBy) {
      switch (sortBy) {
        case 'year':
          preparedVisibleProducts = preparedVisibleProducts.sort((a, b) => {
            const yearComparison = b.year - a.year;
            const priceComparison = b.price - a.price;

            return yearComparison !== 0 ? yearComparison : priceComparison;
          });

          break;
        case 'price':
          preparedVisibleProducts = preparedVisibleProducts.sort(
            (a, b) => a.price - b.price,
          );
          break;
        case 'name':
          preparedVisibleProducts = preparedVisibleProducts.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }

            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }

            return 0;
          });
          break;

        default:
      }
    }

    // if (perPage) {
    //   preparedVisibleProducts = preparedVisibleProducts.slice(
    //     0,
    //     perPage !== 'All' && perPage ? +perPage : products.length,
    //   );
    // }

    setVisibleProducts(preparedVisibleProducts);
  }, [perPage, sortBy, categoryProducts, params.pathname]);

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
