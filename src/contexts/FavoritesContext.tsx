import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFavorites, setFavorites } from '../api/localFavorites';

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavoritesState] = useState<number[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedfavorites = await getFavorites();

      setFavoritesState(storedfavorites);
    };

    loadFavorites();
  }, []);

  const sync = (updated: number[]) => {
    setFavoritesState(updated);
    setFavorites(updated);
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      sync(favorites.filter(item => item !== id));
    } else {
      sync([...favorites, id]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('Context Error');
  }

  return context;
};
