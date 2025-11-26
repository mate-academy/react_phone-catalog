import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  isFavorite: (product: Product) => boolean;
  toggleFavorite: (product: Product) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (product: Product) => {
    return favorites.some(fav => fav.id === product.id);
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const alreadyFavorite = prev.some(fav => fav.id === product.id);

      if (alreadyFavorite) {
        return prev.filter(fav => fav.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
