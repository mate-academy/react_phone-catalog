import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Product } from '../../types/types';
import { FavouritesAction, favouritesReducer } from './FavouritesReducer';

type FavouritesContextType = {
  favourites: Product[];
  setFavourites: React.Dispatch<FavouritesAction>;
};

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null,
);

const getInitialState = (): Product[] => {
  const data = localStorage.getItem('favourites');

  return data ? JSON.parse(data) : [];
};

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useReducer(
    favouritesReducer,
    [],
    getInitialState,
  );

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
