import React, { ReactNode, useContext, useEffect } from 'react';
import { ProductInfo } from '../types';
import { CartActions, ShopingCartReducer } from './ShopingCartReducer';

type ShopingCartContextType = {
  state: ProductInCart[];
  dispatch: React.Dispatch<CartActions>;
};

/* eslint-disable @typescript-eslint/indent */
export const ShopingCartContext = React.createContext<
  ShopingCartContextType | undefined
>(undefined);

type Props = {
  children: ReactNode;
};

export type ProductInCart = {
  id: string;
  quantity: number;
  product: ProductInfo;
};

export const ShopingCartContextProvider: React.FC<Props> = ({ children }) => {
  const initializer = (): ProductInCart[] => {
    const stored = localStorage.getItem('cart');

    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const [state, dispatch] = React.useReducer(
    ShopingCartReducer as React.Reducer<ProductInCart[], CartActions>,
    [] as ProductInCart[],
    initializer,
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <ShopingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopingCartContext.Provider>
  );
};

export const useProductInCart = () => {
  const ctx = useContext(ShopingCartContext);

  if (!ctx) {
    throw new Error('useProducts must be used inside ShopingCartContext');
  }

  return ctx;
};
