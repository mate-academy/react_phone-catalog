import React, { createContext, useCallback, useContext } from 'react';
import { CartItem } from '../types/CartItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CART_KEY = 'cart';

type CartContextType = {
  cart: CartItem[];
  toggleProductInCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>(CART_KEY, []);

  const toggleProductInCart = useCallback(
    (id: string) => {
      const existingItem = cart.find(item => item.id === id);

      setCart(
        existingItem
          ? cart.filter(cartItem => cartItem.id !== id)
          : [...cart, { id, quantity: 1 }],
      );
    },
    [setCart, cart],
  );

  const incrementQuantity = useCallback(
    (id: string) => {
      const updatedCart = cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      setCart(updatedCart);
    },
    [cart, setCart],
  );

  const decrementQuantity = useCallback(
    (id: string) => {
      const updatedCart = cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      );

      setCart(updatedCart);
    },
    [cart, setCart],
  );

  const removeFromCart = useCallback(
    (id: string) => {
      setCart(cart.filter(item => item.id !== id));
    },
    [cart, setCart],
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleProductInCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
