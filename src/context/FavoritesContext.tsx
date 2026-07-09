import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/types';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 1. При завантаженні беремо дані з пам'яті браузера (LocalStorage)
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  // 2. Кожного разу, коли список змінюється — записуємо його в пам'ять
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 3. Та сама функція, яку ти написав (логіка перемикача)
  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isExist = prev.find(item => item.itemId === product.itemId);

      if (isExist) {
        return prev.filter(item => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Хак, щоб не писати useContext(FavoritesContext) кожного разу
export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
