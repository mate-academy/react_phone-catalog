import React, { createContext, useContext } from 'react';
import { Product } from '../types/Product';
import { useProductlist } from '../hooks/useLocalStorageList/useProductList';

interface Props {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  deleteFromFavorites: (id: string) => void;
  isProductInFavorites: (id: string) => boolean;
}

export const FavoritesContext = createContext<Props | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const { items, add, remove, has } = useProductlist('favorites');

  return (
    <FavoritesContext.Provider
      value={{
        favorites: items,
        addToFavorites: add,
        deleteFromFavorites: remove,
        isProductInFavorites: has,
      }}
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
