import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';

// 🔹 новий тип
type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  isInCart: (id: string) => boolean;
  clearCart: () => void;
};

export const CartContext = React.createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  isInCart: () => false,
  clearCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'cart';

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔹 load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  // 🔹 save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // ➕ додає ТІЛЬКИ якщо нема (для toggle-кнопки)
  const addToCart = (product: Product) => {
    const id = product.itemId;

    setCart(prev => {
      const exists = prev.find(p => p.itemId === id);

      if (exists) {
        return prev; // ❗ нічого не робимо
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ❌ повністю видалити
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.itemId !== id));
  };

  // 🔥 просто очищаємо масив
  const clearCart = () => {
    setCart([]);
  };

  // ➕ збільшити кількість (для кошика)
  const increaseQuantity = (id: string) => {
    setCart(prev =>
      prev.map(p => (p.itemId === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  // ➖ зменшити кількість (і видалити якщо 0)
  const decreaseQuantity = (id: string) => {
    setCart(prev =>
      prev
        .map(p => (p.itemId === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter(p => p.quantity > 0),
    );
  };

  // 🔍 перевірка
  const isInCart = (id: string) => {
    return cart.some(p => p.itemId === id);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isInCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
