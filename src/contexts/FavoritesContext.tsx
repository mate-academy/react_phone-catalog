import React, { createContext, useContext, useState, useEffect } from 'react';
import { Item } from '../types/Item';

// eslint-disable-next-line @typescript-eslint/naming-convention
type favoritesContextType = {
  favorites: Item[];
  favoritesIds: string[];
  setFavorites: React.Dispatch<React.SetStateAction<Item[]>>;
  setFavoritesIds: React.Dispatch<React.SetStateAction<string[]>>;
};

// eslint-disable-next-line max-len
const FavoritesContext = createContext<favoritesContextType | undefined>(undefined);

// eslint-disable-next-line max-len
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));

    for (const x of favorites) {
      favoritesIds.push(x.id);
    }
  }, [favorites, favoritesIds]);

  return (
    // eslint-disable-next-line max-len
    <FavoritesContext.Provider value={{ favorites, setFavorites, favoritesIds, setFavoritesIds }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
};
