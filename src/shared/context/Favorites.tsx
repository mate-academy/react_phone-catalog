// shared/context/FavoritesContext.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, ShortProduct } from '../models';

export type FavoriteItem = ShortProduct | Product;

interface FavoritesContextType {
  favoritesItems: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (key: string | number) => void;
  clearFavorites: () => void;
  isFavorite: (key: string | number) => boolean;
  getFavorites: () => FavoriteItem[];
}

const FAVORITES_KEY = 'favorites';

const loadFavorites = (): FavoriteItem[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (items: FavoriteItem[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  } catch {}
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favoritesItems, setFavoritesItems] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavoritesItems(loadFavorites());
  }, []);

  const addFavorite = (item: FavoriteItem) => {
    setFavoritesItems(prev => {
      if (
        prev.some(f => {
          const key = 'itemId' in f ? f.itemId : f.id;
          const newKey = 'itemId' in item ? item.itemId : item.id;
          return key === newKey;
        })
      )
        return prev;

      const updated = [...prev, item];
      saveFavorites(updated);
      return updated;
    });
  };

  const removeFavorite = (key: string | number) => {
    setFavoritesItems(prev => {
      const updated = prev.filter(item => {
        if ('itemId' in item) {
          return item.itemId !== key;
        }
        return item.id !== key;
      });
      saveFavorites(updated);
      return updated;
    });
  };

  const clearFavorites = () => {
    setFavoritesItems([]);
    localStorage.removeItem(FAVORITES_KEY);
  };

  const isFavorite = (key: string | number) => {
    return favoritesItems.some(item => {
      if ('itemId' in item) {
        return item.itemId === key;
      }
      return item.id === key;
    });
  };

  const getFavorites = () => favoritesItems;

  return (
    <FavoritesContext.Provider
      value={{
        favoritesItems,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
        getFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider');
  return ctx;
};
