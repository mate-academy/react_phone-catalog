import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  deleteFromCart: (productId: number) => void;
  isCart: (id: number) => boolean;
  increaseCount: (productId: number) => void;
  decreaseCount: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');

    if (saved) {
      const parsed: Product[] = JSON.parse(saved);

      setCart(parsed.map(item => ({ ...item, count: item.count ?? 1 })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev =>
      prev.some(item => item.id === product.id)
        ? prev
        : [...prev, { ...product, count: 1 }],
    );
  };

  const deleteFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const isCart = (id: number) => {
    return cart.some(item => item.id === id);
  };

  const increaseCount = (productId: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, count: (item.count ?? 1) + 1 }
          : item,
      ),
    );
  };

  const decreaseCount = (productId: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId && (item.count ?? 0) > 1
          ? { ...item, count: (item.count ?? 0) - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteFromCart,
        isCart,
        increaseCount,
        decreaseCount,
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
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
