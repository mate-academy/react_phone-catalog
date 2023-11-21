import React, { useContext, useMemo } from 'react';
import { CartProduct } from '../types/CartProduct';
import { getCartTotalQuantity } from '../utils/cartHelper';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartGlobalContext = {
  cart: CartProduct[];
  setCart: React.Dispatch<React.SetStateAction<CartProduct[]>>;
  totalQuantity: number;
};

export const CartContext = React.createContext<CartGlobalContext>({
  cart: [],
  setCart: () => {},
  totalQuantity: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', []);
  const totalQuantity = useMemo(() => {
    return getCartTotalQuantity(cart);
  }, [cart]);

  const value = useMemo(() => {
    return { cart, setCart, totalQuantity };
  }, [cart]);

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  );
};

export function useCart() {
  const cart = useContext(CartContext);

  return cart;
}
