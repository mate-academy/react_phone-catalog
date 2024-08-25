import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Phone } from '../types';

type FavoritesContextType = {
  favorites: Phone[];
  addToFavorites: (phone: Phone) => void;
  removeFromFavorites: (id: string) => void;
  isInFavorites: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

const LOCAL_STORAGE_KEY = 'favorites';

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Phone[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (phone: Phone) => {
    setFavorites((prevFavorites) => [...prevFavorites, phone]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((phone) => phone.id !== id),
    );
  };

  const isInFavorites = (id: string) => {
    return favorites.some((phone) => phone.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isInFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = React.useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
