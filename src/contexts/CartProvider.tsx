import { createContext, FunctionComponent, useMemo } from 'react';

// Hooks
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  setCart: (value: string[]) => {
    localStorage.setItem('cart', JSON.stringify(value));
  },
});

export const CartProvider: FunctionComponent = ({ children }) => {
  const [cart, setCart] = useLocalStorage([], 'cart');

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
