import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from '../types';

type Props = {
  children: ReactNode;
};

type FavoritesContextType = {
  favoritesItems: Product[];
  addToFavorites: (item: Product) => void;
  removeFromFavorites: (itemId: number) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favoritesItems: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export const FavoritesProvider = ({ children }: Props) => {
  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);

  useEffect(() => {
    const favoritesItemsStr = JSON.stringify(favoritesItems);

    localStorage.setItem('favorites', favoritesItemsStr);
  }, [favoritesItems]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');

    if (saved) {
      setFavoritesItems(JSON.parse(saved));
    }
  }, []);

  function addToFavorites(item: Product) {
    setFavoritesItems([...favoritesItems, item]);
  }

  function removeFromFavorites(itemId: number) {
    setFavoritesItems(favoritesItems.filter(item => item.id !== itemId));
  }

  return (
    <FavoritesContext.Provider
      value={{ favoritesItems, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
