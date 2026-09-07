import React, { createContext, useContext, useEffect, useState } from 'react';
import { FavoriteContextType, Product } from '../types';

const LOCAL_STORAGE_KEY = 'favorites';

const loadFavorites = (): Product[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: Product[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    //quota exceeded
  }
};

const FavoriteContext = createContext<FavoriteContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    return loadFavorites();
  });

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exist = prev.some(fav => fav.id === product.id);

      return exist
        ? prev.filter(fav => fav.id !== product.id)
        : [...prev, product];
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
