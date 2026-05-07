import React, { useCallback, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Product } from './types/Product';

type FavouritesContextType = {
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavouritesContext = React.createContext<FavouritesContextType>({
  favourites: [],
  setFavourites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, saveFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  const setFavourites: React.Dispatch<React.SetStateAction<Product[]>> =
    useCallback(
      value => {
        if (typeof value === 'function') {
          saveFavourites(value(favourites));
        } else {
          saveFavourites(value);
        }
      },
      [favourites, saveFavourites],
    );

  const value = useMemo(
    () => ({ favourites, setFavourites }),
    [favourites, setFavourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
