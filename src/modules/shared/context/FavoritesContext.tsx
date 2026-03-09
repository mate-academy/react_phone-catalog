import React, { createContext, useContext, useMemo } from 'react';
import { Product } from '../../../types/Product';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (product: Product) => void;
  isFavorite: (product: Product) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const isFavorite = (product: Product) => {
    return favorites.some(fav => fav.id === product.id);
  };

  const addToFavorites = (product: Product) => {
    if (!isFavorite(product)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (product: Product) => {
    setFavorites(favorites.filter(fav => fav.id !== product.id));
  };

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
