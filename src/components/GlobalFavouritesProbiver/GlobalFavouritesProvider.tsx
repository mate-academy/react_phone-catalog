import React from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type Context = {
  favourites: string[];
  setFavourites: (value: string[]) => void;
};

export const FavouritesContext = React.createContext<Context>({
  favourites: [],
  setFavourites: () => {},
});

export const GlobalFavouritesProvider: React.FC = ({ children }) => {
  const [
    favourites,
    setFavourites,
  ] = useLocalStorage<string[]>('favourite', []);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
