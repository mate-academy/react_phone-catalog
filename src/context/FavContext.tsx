/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';

type State = {
  favourites: Product[],
  setFavourites: (favProducts: Product[]) => void,
  handleAddToFav: (product: Product) => void,
};

export const FavouritesContext = React.createContext<State>({
  favourites: [],
  setFavourites: () => {},
  handleAddToFav: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [
    favourites,
    setFavourites,
  ] = useLocalStorage<Product[]>('favourites', []);

  const handleAddToFav = (product: Product) => {
    if (favourites.some(fav => fav.id === product.id)) {
      setFavourites((currentFavs: Product[]) => (
        currentFavs.filter(fav => fav.id !== product.id)
      ));
    } else {
      setFavourites((currentFavs: Product[]) => [...currentFavs, product]);
    }
  };

  const value = useMemo(() => ({
    favourites,
    setFavourites,
    handleAddToFav,
  }), [favourites]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
