import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((currentFavorites: Product[]) => {
        const isFav = currentFavorites.some(
          (item: Product) => item.id === product.id,
        );

        if (isFav) {
          return currentFavorites.filter(
            (item: Product) => item.id !== product.id,
          );
        }

        return [...currentFavorites, product];
      });
    },
    [setFavorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
    }),
    [favorites, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
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
