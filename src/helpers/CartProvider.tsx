import { createContext, FC, useMemo } from 'react';

import { useLocalStorage } from '../utils/useLocalStorage';
import { CardItem } from '../types/CardItem';

export const CartContext = createContext({
  cart: JSON.parse(localStorage.getItem('carts') || '[]'),
  setCart: (value: ((prev: CardItem[]) => CardItem[]) | CardItem[]) => {
    if (typeof value === 'function' || !value) {
      return;
    }

    localStorage.setItem('carts', JSON.stringify(value));
  },
});

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CardItem[]>('carts', []);

  const contextValue = useMemo(() => {
    return {
      cart,
      setCart,
    };
  }, [cart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
