import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesProduct, Products } from '../../../types/Product';

export interface FavoritesContextType {
  favorites: FavoritesProduct[];
  toggleFavorites: (product: Products) => void;
  totalFavorites: number;
}

const FAVORITES_KEY = 'favorites';

export const FavoritesContext = React.createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoritesProduct[]>(() => {
    const savedItems = localStorage.getItem(FAVORITES_KEY);

    try {
      return savedItems ? JSON.parse(savedItems) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorites = useCallback((product: Products) => {
    setFavorites((currentItems) => {
      const isFavorite = currentItems.some((item) => item.product.itemId === product.itemId);

      if (!isFavorite) {
        const newItem = {
          id: product.itemId,
          product: product,
        };

        return [...currentItems, newItem];
      }

      return currentItems.filter((item) => item.product.itemId !== product.itemId);
    });
  }, []);

  const totalFavorites = favorites.length;

  const favoritesValue = useMemo(
    () => ({
      favorites,
      toggleFavorites,
      totalFavorites,
    }),
    [favorites, toggleFavorites, totalFavorites],
  );

  return <FavoritesContext.Provider value={favoritesValue}>{children}</FavoritesContext.Provider>;
};
