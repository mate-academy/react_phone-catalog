import { createContext, FC, useMemo } from 'react';

import { useLocalStorage } from '../utils/useLocalStorage';
import { CardItem } from '../types/CardItem';

export const CartContext = createContext({
  cart: JSON.parse(localStorage.getItem('carts') || '[]'),
  setCart: (value: CardItem[]) => {
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
  }, [cart.length]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
