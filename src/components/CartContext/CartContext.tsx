import React, { createContext, useContext, useEffect, useState } from 'react';

import { Product } from '../../modules/HomePage/HomePage';

export interface CartItem extends Product {
  id: number;

  quantity: number;
}

interface ContextProps {
  favorites: Product[];

  cart: CartItem[];

  addToFavorites: (p: Product) => void;

  addToCart: (p: Product) => void;

  removeFromCart: (id: number) => void;

  updateQuantity: (id: number, delta: number) => void;
}

const GlobalContext = createContext<ContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 1. Инициализируем стейт из localStorage (ленивая инициализация)
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Отслеживаем изменения стейтов и сохраняем их в localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // --- Все твои функции остаются абсолютно без изменений ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      const isExist = prev.find(item => item.id === product.id);

      if (isExist) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        favorites,
        cart,
        addToFavorites,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobal must be used within GlobalProvider');
  }

  return context;
};
