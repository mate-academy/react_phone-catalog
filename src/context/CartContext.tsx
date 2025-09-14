import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  deleteFromCart: (productId: number) => void;
  isCart: (id: number) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev =>
      prev.some(item => item.id === product.id) ? prev : [...prev, product],
    );
  };

  const deleteFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const isCart = (id: number) => {
    return cart.some(item => item.id === id);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteFromCart, isCart }}>
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
