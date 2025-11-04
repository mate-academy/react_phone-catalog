import React, { createContext } from 'react';
import { useLocaleStorage } from '../hooks/useLocaleStorage';

type FavesContextType = {
  favourites: string[];
  setFavourites: (v: string[]) => void;
};

export const FavesContext = createContext<FavesContextType>({
  favourites: [],
  setFavourites: () => {},
});

export const FavesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useLocaleStorage<string[]>(
    'favourites',
    [],
  );

  return (
    <FavesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavesContext.Provider>
  );
};
