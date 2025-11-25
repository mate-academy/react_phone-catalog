import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/product';
import { STORAGE_KEYS } from '../constants';

type Props = {
  children: React.ReactNode;
};

type FavoriteContextType = {
  favorites: Product[];
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  setFavorites: () => {},
});

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const saved = localStorage.getItem('favorites');
  const listOfFavoritesItems = saved ? JSON.parse(saved) : [];

  const [favorites, setFavorites] = useState<Product[]>(listOfFavoritesItems);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      setFavorites,
    }),
    [favorites, setFavorites],
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
