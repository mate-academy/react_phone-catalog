import React, { createContext } from 'react';

import { CartItemType } from '../types';
import { useLocalStorage } from '../hooks';

type CartContextType = {
  cart: CartItemType[];
  addCartItem: (item: CartItemType) => void;
  removeCartItem: (itemId: CartItemType['itemId']) => void;
  updateCartItemQuantity: (
    itemId: CartItemType['itemId'],
    quantity: number,
  ) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>('cart', []);

  const addCartItem = (item: CartItemType) => {
    setCart(prev =>
      prev.some(cartItem => cartItem.itemId === item.itemId)
        ? prev
        : [item, ...prev],
    );
  };

  const removeCartItem = (itemId: CartItemType['itemId']) => {
    setCart(prev => prev.filter(cartItem => cartItem.itemId !== itemId));
  };

  const updateCartItemQuantity = (
    itemId: CartItemType['itemId'],
    quantity: number,
  ) => {
    const normalizedQuantity = Math.min(999, Math.max(1, quantity));

    setCart(prev =>
      prev.map(cartItem =>
        cartItem.itemId === itemId
          ? { ...cartItem, quantity: normalizedQuantity }
          : cartItem,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCartItem,
        removeCartItem,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
