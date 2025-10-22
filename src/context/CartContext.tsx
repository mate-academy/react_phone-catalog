import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  toggleCart: (product: Product) => void;
  isInCart: (id: string) => boolean;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const syncCart = (e: StorageEvent) => {
      if (e.key === CART_KEY) {
        setCart(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', syncCart);
    return () => window.removeEventListener('storage', syncCart);
  }, []);

  const toggleCart = (product: Product) => {
    setCart(prev => {
      const idx = prev.findIndex(p => String(p.id) === String(product.id));
      if (idx !== -1) {
        return prev.filter(p => String(p.id) !== String(product.id));
      } else {
        return [...prev, { ...product, id: String(product.id), quantity: 1 }];
      }
    });
  };

  const isInCart = (id: string) => cart.some(p => String(p.id) === String(id));

  const increaseQuantity = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        String(item.id) === String(id) ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        String(item.id) === String(id)
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => String(item.id) !== String(id)));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
