/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';
import { useLocalStorage, type localProduct } from '../hooks/useLocalStorage';
import type { Product } from '../types/products';

interface CartContextType {
  productInCart: localProduct[];
  setProductInCart: (v: Product) => void;
  setCount: (v: Product, op: 'add' | 'sub') => void;
}

export const CartContext = React.createContext<CartContextType>({
  productInCart: [],
  setProductInCart: () => {},
  setCount: () => {},
});

interface PropsCartContext {
  children: React.ReactNode;
}

export const CartProvider: React.FC<PropsCartContext> = ({ children }) => {
  const [productInCart, setProductInCart, setCount] = useLocalStorage<Product>(
    'cart',
    [],
  );

  const value = useMemo(
    () => ({ productInCart, setProductInCart, setCount }),
    [productInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
