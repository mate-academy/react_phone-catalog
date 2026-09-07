import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import { DeviceType } from '../../types/DeviceType';

type FavoritesItem = ProductType | DeviceType;

type FavoritesContextType = {
  favorites: FavoritesItem[];
  addToFavorites: (product: FavoritesItem) => void;
  removeFromFavorites: (id: string | number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoritesItem[]>(() => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      const parsedFavorites: FavoritesItem[] = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];

      return parsedFavorites.filter(
        item => item.id !== null && item.id !== undefined,
      );
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: FavoritesItem) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === product.id) ? prev : [...prev, product],
    );
  };

  const removeFromFavorites = (id: string | number) => {
    setFavorites(prev => {
      return prev.filter(fav => String(fav.id) !== String(id));
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
