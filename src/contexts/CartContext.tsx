import React, { createContext, useContext, useMemo } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }

      return [...prev, { id: product.id, quantity: 1, product }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const setQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (id: string) => cartItems.some(item => item.id === id);

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
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    isInCart,
    totalQuantity,
    totalPrice,
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
