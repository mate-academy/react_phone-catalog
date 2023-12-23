import React, { useMemo } from 'react';
import { useLocalStorage } from '../useLocalStorage';
import { ProductCardType } from '../types/ProductCardType';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  productsInCart: ProductCardType[];
  setProductsInCart: (value: ProductCardType[]) => void;
};

export const CartContext = React.createContext<ContextType>({
  productsInCart: [],
  setProductsInCart: () => {},
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [productsInCart, setProductsInCart]
  = useLocalStorage('cart', []);

  const value = useMemo(() => (
    { productsInCart, setProductsInCart }
  ), [productsInCart, setProductsInCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
