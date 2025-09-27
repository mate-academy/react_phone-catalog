import React, { createContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

interface FavouriteContextType {
  favourites: Product[];
  addFavouriteProduct: (value: Product) => void;
  removeFavouriteProduct: (elementId: string) => void;
}

export const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  addFavouriteProduct: () => {},
  removeFavouriteProduct: () => {},
});

interface FavouriteProviderProps {
  children: React.ReactNode;
}

export const FavouriteProvider: React.FC<FavouriteProviderProps> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      setFavourites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavouriteProduct = (value: Product) => {
    setFavourites(prevFavourites => {
      return [...prevFavourites, value];
    });
  };

  const removeFavouriteProduct = (elementId: string) => {
    setFavourites(prevFavourites => {
      return prevFavourites.filter(favourite => favourite.itemId !== elementId);
    });
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addFavouriteProduct, removeFavouriteProduct }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
