import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favoriteIds: string[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (product: Product) => {
    setFavoriteIds(currentIds => {
      if (currentIds.includes(product.itemId)) {
        return currentIds.filter(id => id !== product.itemId);
      }

      return [...currentIds, product.itemId];
    });
  };

  const isFavorite = (itemId: string) => {
    return favoriteIds.includes(itemId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const value = useContext(FavoritesContext);

  if (!value) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return value;
};
