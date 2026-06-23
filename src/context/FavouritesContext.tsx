/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type FavouritesContentType = {
  favourites: Product[];
  addToFavourites: (product: Product) => void;
  removeFromFavourites: (productId: number) => void;
  isFavourite: (productId: number) => boolean;
};

export const FavouritesContext = createContext<
  FavouritesContentType | undefined
>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favourites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (product: Product) => {
    setFavourites(prev => [...prev, product]);
  };

  const removeFromFavourites = (productId: number) => {
    setFavourites(prev => prev.filter(p => p.id !== productId));
  };

  const isFavourite = (productId: number) => {
    return favourites.some(p => p.id === productId);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
