import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isInFavorites: (itemId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.itemId === product.itemId);

      if (exists) {
        return prev.filter(item => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  const isInFavorites = (itemId: string) =>
    favorites.some(item => item.itemId === itemId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isInFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorite must be used within FavoritesProvider');
  }

  return context;
};
