import React, { createContext, ReactNode, useContext } from 'react';
import { Product } from '@/types/product';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const addToFavorites = (product: Product) => {
    if (!favorites.some(item => item.itemId === product.itemId)) {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(favorites.filter(item => item.itemId !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.itemId === productId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
