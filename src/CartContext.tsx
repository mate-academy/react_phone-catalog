import React from 'react';
import { CartItemInfo } from './types/CartItemInfo';
import { useLocalStorage } from './utils/localStorageHook';

type Props = {
  cartItems: CartItemInfo[];
  setCartItems: (product: CartItemInfo[]) => void;
};

export const CartContext = React.createContext<Props>({
  cartItems: [],
  setCartItems: () => null,
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems]
  = useLocalStorage('cartItems', []);

  const contextValue = {
    cartItems,
    setCartItems,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
