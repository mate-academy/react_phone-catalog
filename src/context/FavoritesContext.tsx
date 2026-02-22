import React, { useMemo, useCallback } from 'react';
import { Product } from '../types';
import { useLocalStorage } from '../utils/useLocalStorage';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  favoritesCount: number;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  favoritesCount: 0,
});

interface Props {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((prev: Product[]) => {
        const exists = prev.some(fav => fav.id === product.id);

        if (exists) {
          return prev.filter(fav => fav.id !== product.id);
        }

        return [...prev, product];
      });
    },
    [setFavorites],
  );

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.some(fav => fav.id === productId);
    },
    [favorites],
  );

  const favoritesCount = favorites.length;

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      favoritesCount,
    }),
    [favorites, toggleFavorite, isFavorite, favoritesCount],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
