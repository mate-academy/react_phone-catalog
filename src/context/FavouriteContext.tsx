import React, { useEffect, useState, createContext } from 'react';
import { Product } from '../types/Product';

type FavouriteContextType = {
  favourites: Product[],
  setFavourites: (favourites: Product[]) => void,
};

export const FavouriteContext = createContext<FavouriteContextType>({
  favourites: [],
  setFavourites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites');

    if (savedFavourites) {
      try {
        setFavourites(JSON.parse(savedFavourites));
      } catch {
        localStorage.removeItem('favourites');
      }
    }
  }, []);

  return (
    <FavouriteContext.Provider
      value={{ favourites, setFavourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
