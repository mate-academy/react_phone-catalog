'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type CartItem = Record<string, number>;

// const cardItems = {
//   "iphone-16-pro": 2,
//   "samsung-galaxy-s24": 1,
// }

interface CartContextType {
  cartItems: CartItem;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem>({});
  const [isLoaded, setIsLoaded] = useState(false); // важливо!

  // --- LOAD FROM LOCAL STORAGE ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');

      if (saved) {
        const parsed = JSON.parse(saved);

        setCartItems(parsed);
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }

    setIsLoaded(true);
  }, []);

  // --- SAVE TO LOCAL STORAGE ---
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // ADD TO CART
  const addToCart = (id: string) => {
    setCartItems(prev => {
      const currentQuantity = prev[id] || 0;

      return {
        ...prev,
        [id]: currentQuantity + 1,
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const updatedCart = { ...prev };

      delete updatedCart[id];

      return updatedCart;
    });
  };

  const increment = (id: string) => {
    setCartItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id: string) => {
    setCartItems(prev =>
      prev[id] > 1
        ? { ...prev, [id]: prev[id] - 1 }
        : Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== id),
          ),
    );
  };

  const clearCart = () => {
    setCartItems({});
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
};
