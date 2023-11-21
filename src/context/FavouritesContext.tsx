import React, { useContext, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavouritesGlobalContext = {
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const FavouritesContext = React.createContext<FavouritesGlobalContext>({
  favourites: [],
  setFavourites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  const value = useMemo(() => {
    return { favourites, setFavourites };
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={value}>
      { children }
    </FavouritesContext.Provider>
  );
};

export function useFavourites() {
  const favourites = useContext(FavouritesContext);

  return favourites;
}
