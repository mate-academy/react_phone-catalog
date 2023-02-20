import React from 'react';
import { useLocalStorage } from './utils/localStorageHook';

type Props = {
  favourites: string[];
  setFavourites: (product: string[]) => void;
};

export const FavContext = React.createContext<Props>({
  favourites: [],
  setFavourites: () => null,
});

export const FavouritesProvider: React.FC = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  const contextValue = {
    favourites,
    setFavourites,
  };

  return (
    <FavContext.Provider value={contextValue}>
      {children}
    </FavContext.Provider>
  );
};
