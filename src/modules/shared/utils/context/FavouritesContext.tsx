/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

import { createContext, useContext, useEffect, useState } from 'react';

import { ProductType } from '../types';

interface FavouritesContextType {
  favourites: ProductType[];
  favouritesCount: number;
  toggleFavourite: (product: ProductType) => void;
  isFavourite: (itemId: string) => boolean;
}

export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider = (
  { children }: { children: React.ReactNode }
) => {
  const [favourites, setFavourites] = useState<ProductType[]>(() => {
    const savedFavs = localStorage.getItem('favourites');

    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const favouritesCount = favourites.length;

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  function addToFavourites(product: ProductType):void {
    setFavourites(prev => [...prev, product]);
  }

  function removeFromFavourites(itemId: string):void {
    setFavourites(prev => prev.filter(pr => pr.itemId !== itemId));
  }

  function isFavourite(itemId: string):boolean {
    return favourites.some(pr => pr.itemId === itemId);
  }

  function toggleFavourite(product: ProductType) {
    const isActive = isFavourite(product.itemId);

    if (isActive) {
      removeFromFavourites(product.itemId);
    } else {
      addToFavourites(product);
    }
  }

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        favouritesCount,
        toggleFavourite,
        isFavourite
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return context;
};
