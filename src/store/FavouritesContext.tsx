import React, { useMemo } from 'react';
import { useLocalStorage } from '../modules/hooks/useLocalStorage';
import { FavItem } from '../types/FavItem';

type ContextType = {
  favouritesList: FavItem[];
  setFavouritesList: React.Dispatch<FavItem[]>;
};

export const FavoutitesContext = React.createContext<ContextType>({
  favouritesList: [],
  setFavouritesList: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favouritesList, setFavouritesList] = useLocalStorage<FavItem[]>(
    'favItem',
    [],
  );

  const value = useMemo(
    () => ({
      favouritesList,
      setFavouritesList,
    }),
    [favouritesList, setFavouritesList],
  );

  return (
    <FavoutitesContext.Provider value={value}>
      {children}
    </FavoutitesContext.Provider>
  );
};
