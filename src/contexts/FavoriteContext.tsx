import React from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';

interface State {
  favourites: Product[],
  setFavourites: (favProducts: Product[]) => void,
  handleAddToFav: (product: Product) => void,
}

export const FavouriteContext = React.createContext<State>({
  favourites: [],
  setFavourites: () => {},
  handleAddToFav: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const FavouriteProvider: React.FC<Props> = ({ children }) => {
  const [
    favourites,
    setFavourites,
  ] = useLocalStorage<Product[]>('favorites', []);

  const handleAddToFav = (product: Product) => {
    if (favourites.some(fav => fav.id === product.id)) {
      setFavourites((currentFavs: Product[]) => (
        currentFavs.filter(fav => fav.id !== product.id)
      ));
    } else {
      setFavourites((currentFavs: Product[]) => [...currentFavs, product]);
    }
  };

  const value = {
    favourites,
    setFavourites,
    handleAddToFav,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
