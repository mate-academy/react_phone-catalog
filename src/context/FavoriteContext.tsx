import React, { useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../utils/useLocalStorage';

type FavoriteContextType = {
  favoriteItems: Product[];
  setFavoriteItems: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavoriteContext = React.createContext<
  FavoriteContextType | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
};

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useLocalStorage<Product[]>(
    'favorite',
    [],
  );

  const value = useMemo(
    () => ({
      favoriteItems: favoriteItems,
      setFavoriteItems: setFavoriteItems,
    }),
    [favoriteItems, setFavoriteItems],
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = React.useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};
