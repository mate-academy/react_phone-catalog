import React, { useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Context = {
  favourites: Product[];
  handleFavourites: (newProduct: Product) => void;
};

const State: Context = {
  favourites: [],
  handleFavourites: () => {},
};

export const FavouritesContext = React.createContext(State);

type Props = {
  children: React.ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );

  const handleFavourites = useCallback(
    (newProduct: Product) => {
      const liked = favourites.find((fav: Product) => fav.id === newProduct.id);

      if (liked) {
        const updatedFavourites = favourites.filter(
          (favourite: Product) => favourite.id !== newProduct.id,
        );

        setFavourites(updatedFavourites);
      } else {
        setFavourites([...favourites, newProduct]);
      }
    },
    [favourites, setFavourites],
  );

  const value = useMemo(
    () => ({
      favourites,
      handleFavourites,
    }),
    [favourites, handleFavourites],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
