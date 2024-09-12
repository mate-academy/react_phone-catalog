import React, { useMemo } from 'react';
import { Product } from './types';
import { useLocalStorage } from './useLocalStorage';

type CartContextType = {
  cartItems: Product[];
  setCartItems: (v: Product[]) => void;
  removeFromCart: (productId: number) => void;
};

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  removeFromCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<Product[]>('cartItems', []);

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      removeFromCart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, setCartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
