import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product } from '../types';

interface FavoritesContextValue {
  favorites: Product[];
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const isFavorite = (itemId: string) =>
    favorites.some(item => item.itemId === itemId);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(item => item.itemId === product.itemId)
        ? prev.filter(item => item.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  const value = { favorites, isFavorite, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
