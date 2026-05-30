import React, { createContext } from 'react';

import { FavoriteItem } from '../types';
import { useLocalStorage } from '../hooks';

type FavoritesContextType = {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (itemId: FavoriteItem['itemId']) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
    'favorites',
    [],
  );

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev =>
      prev.some(fav => fav.itemId === item.itemId) ? prev : [item, ...prev],
    );
  };

  const removeFavorite = (itemId: FavoriteItem['itemId']) => {
    setFavorites(prev => prev.filter(fav => fav.itemId !== itemId));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
