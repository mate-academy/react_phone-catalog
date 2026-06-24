import React, { createContext } from 'react';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { Product } from '../../types/types';
import { getLocaleStorage } from '../../utils/getLocaleStorage';
import { FavouritesAction, favouritesReducer } from './FavouritesReducer';

type FavouritesContextType = {
  favourites: Product[];
  setFavourites: React.Dispatch<FavouritesAction>;
};

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null,
);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useReducer(favouritesReducer, [], () =>
    getLocaleStorage('favourites'),
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
