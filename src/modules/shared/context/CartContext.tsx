import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem, Product } from '../types';

interface CartContextValue {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isInCart: (itemId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const isInCart = (itemId: string) =>
    cartItems.some(item => item.id === itemId);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === product.itemId)) {
        return prev;
      }

      return [...prev, { id: product.itemId, quantity: 1, product }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const setQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const value = {
    cartItems,
    totalQuantity,
    totalPrice,
    isInCart,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
