import React, { useMemo } from 'react';
import { useLocalStorage } from '../helpers/useLocalStroage';
import { ProductCardType } from '../types/ProductCard';

type Props = {
  children: React.ReactNode,
};

type ContextType = {
  productsInCart: ProductCardType[],
  setProductsInCart: (value: ProductCardType[]) => void,
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
  ), [productsInCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
