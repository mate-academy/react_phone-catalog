/* eslint-disable prettier/prettier */
import { createContext, ReactNode } from 'react';

import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];

  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

type Props = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const addFavorite = (product: Product) => {
    if (favorites.some(item => item.id === product.id)) {
      return;
    }

    setFavorites([...favorites, product]);
  };

  const removeFavorite = (productId: number) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
