import React, { useEffect, useState } from 'react';
import { Context } from '../types/Context';
import { Product } from '../types/Product';
import { useLocalStorage } from './useLocalStorage';
import { CartItemType } from '../types/CartItemType';
import { getAllProducts } from '../api/api';

const State: Context = {
  isLoading: false,
  setIsLoading: () => {},
  favouritesList: [],
  setFavouritesList: () => {},
  cartList: [],
  setCartList: () => {},
  fullListOfProducts: [],
  setFullListOfProducts: () => {},
};

export const GeneralContext = React.createContext<Context>(State);

type Props = {
  children: React.ReactNode,
};

export const GeneralProvider: React.FC<Props> = ({ children }) => {
  const [favouritesList, setFavouritesList]
  = useLocalStorage<Product[]>('favourities', []);
  const [cartList, setCartList] = useLocalStorage<CartItemType[]>('cart', []);
  const [isLoading, setIsLoading] = useState(false);
  const [fullListOfProducts, setFullListOfProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(setFullListOfProducts);
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    favouritesList,
    setFavouritesList,
    cartList,
    setCartList,
    fullListOfProducts,
    setFullListOfProducts,
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
};
