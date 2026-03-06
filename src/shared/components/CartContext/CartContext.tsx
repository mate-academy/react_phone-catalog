import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CartProduct, Products } from '../../../types/Product';

export interface CartContextType {
  cartItems: CartProduct[];
  addToCart: (product: Products) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CART_KEY = 'cartItems';

export const CartContext = React.createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>(() => {
    const savedItems = localStorage.getItem(CART_KEY);

    try {
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Products) => {
    return setCartItems((currentItems) => {
      const isInCart = currentItems.some((item) => item.id === product.id);

      if (isInCart) {
        return currentItems;
      }

      const newProduct = {
        id: product.id,
        quantity: 1,
        product: product,
      };

      return [...currentItems, newProduct];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        return item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item;
      });
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice],
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
