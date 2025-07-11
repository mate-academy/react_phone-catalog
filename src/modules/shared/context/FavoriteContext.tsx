import React, { createContext, useContext, useState } from 'react';
import { FavoritContextType, Product } from '../types';

const FavoriteContext = createContext<FavoritContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(fav => fav.id === product.id)
        ? prev.filter(fav => fav.id !== product.id)
        : [...prev, product],
    );
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
