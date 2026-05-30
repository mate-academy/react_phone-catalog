import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

export interface FavoritesContextProps {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number | string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const stored = localStorage.getItem('favorites');

    return stored ? (JSON.parse(stored) as Product[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      // If product already exists, remove it; otherwise add it.
      if (prev.find(fav => fav.id === product.id)) {
        return prev.filter(fav => fav.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (productId: number | string) => {
    return favorites.some(product => product.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
