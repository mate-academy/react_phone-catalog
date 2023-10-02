import React, { useMemo } from 'react';
import { Phone } from '../types/Phone';
import { useLocalStorage } from '../helpers/useLocalStroage';

type Props = {
  children: React.ReactNode,
};

type ContextType = {
  productsInCart: Phone[],
  setProductsInCart: (value: Phone[]) => void,
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
