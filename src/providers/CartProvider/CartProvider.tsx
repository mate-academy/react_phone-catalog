import React, { useMemo } from 'react';

import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';

type ProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  productsInCart: Product[];
  setProductsInCart: (value: Product[]) => void;
};

export const CartContext = React.createContext<ContextProps>({
  productsInCart: [],
  setProductsInCart: () => {},
});

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [productsInCart, setProductsInCart] = useLocalStorage('cart', []);

  const value = useMemo(() => (
    { productsInCart, setProductsInCart }), [productsInCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
