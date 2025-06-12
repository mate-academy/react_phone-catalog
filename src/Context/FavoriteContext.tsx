import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FAVOURITE_KEY = 'favouritesProducts';

type FavouriteContexType = {
  favourites: string[];
  addToFavourites: (id: string) => void;
  removeFromFavourites: (id: string) => void;
  isFavourite: (id: string) => boolean;
};

const FavouriteContext = createContext<FavouriteContexType | undefined>(
  undefined,
);

export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useLocalStorage<string[]>(
    FAVOURITE_KEY,
    [],
  );

  const addToFavourites = (id: string) => {
    if (!favourites.includes(id)) {
      setFavourites([...favourites, id]);
    }
  };

  const removeFromFavourites = (id: string) => {
    setFavourites(favourites.filter(favId => favId !== id));
  };

  const isFavourite = (id: string) => favourites.includes(id);

  return (
    <FavouriteContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavouriteProvider');
  }

  return context;
};
