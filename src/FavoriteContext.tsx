import React, { createContext, useContext, useEffect, useState } from 'react';

export type FavoriteProduct = {
  id: string; // уникальный с учетом режима
  itemId: string;
  category: string;
  name: string;
  price: number;
  fullPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  image: string;
};

type FavoritesContextType = {
  favorites: FavoriteProduct[];
  addFavorite: (product: FavoriteProduct) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('favorites');

    if (raw) {
      setFavorites(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (product: FavoriteProduct) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id) ? prev : [...prev, product],
    );
  };

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const isFavorite = (id: string) => favorites.some(p => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
};
