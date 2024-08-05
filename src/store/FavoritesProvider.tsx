import React, { useContext, useEffect, useState } from 'react';
import { FAVORITES_KEY } from '../constants/constants';
import { Product } from '../types/Product';
import { getLocalStorage } from '../utils';
/* eslint-disable @typescript-eslint/indent */
type Props = {
  children: React.ReactNode;
};

type FavoritesContextType = {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeProduct: (id: number) => void;
};

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => {},
  removeProduct: () => {},
});

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    return getLocalStorage(FAVORITES_KEY);
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    setFavorites(currentFavorites => [...currentFavorites, product]);
  };

  const removeProduct = (id: number) => {
    setFavorites(favorites.filter(product => product.id !== id));
  };

  const getStoreValues = () => {
    return { favorites, addToFavorites, removeProduct };
  };

  return (
    <FavoritesContext.Provider value={getStoreValues()}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
