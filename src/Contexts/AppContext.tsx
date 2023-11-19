import {
  createContext, useState, useCallback, useEffect,
} from 'react';
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
  currentItem: PhoneType | null;
  setCurrentItem: React.Dispatch<React.SetStateAction<PhoneType | null>>;
  perPage: OptionType;
  setPerPage: React.Dispatch<React.SetStateAction<OptionType>>;
  favorites: ProductType[];
  setFavorites: React.Dispatch<React.SetStateAction<ProductType[]>>
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export type OptionType = { value: number; label: string };

const DefaultAppValues = {
  products: [],
  setProducts: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  perPage: {
    value: 8,
    label: '8',
  },
  setPerPage: () => null,
  favorites: [],
  setFavorites: () => null,
  cartItems: [],
  setCartItems: () => null,
};

export const appContext = createContext<DefaultAppType>(DefaultAppValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [currentItem, setCurrentItem] = useState<PhoneType | null>(null);
  const [perPage, setPerPage] = useState<OptionType>(DefaultAppValues.perPage);
  const [favorites, setFavorites] = useLocalStorage<ProductType[]>(
    'favorites',
    [],
  );
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'cart',
    [],
  );

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

  const state: DefaultAppType = {
    products,
    setProducts,
    currentItem,
    setCurrentItem,
    perPage,
    setPerPage,
    favorites,
    setFavorites,
    cartItems,
    setCartItems,
  };

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};
