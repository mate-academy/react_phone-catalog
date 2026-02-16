import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

type FavouritesType = {
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
  getActiveLike: (product: Product) => boolean;
  handleLike: (product: Product) => void;
};

export const FavouritesContext = createContext<FavouritesType>({
  favourites: [],
  setFavourites: () => {},
  getActiveLike: () => false,
  handleLike: () => {},
});

type Props = {
  children: ReactNode;
};

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', []);

  const getActiveLike = (product: Product) => {
    return favourites.some((item: Product) => product.id === item.id);
  };

  const handleLike = (product: Product) => {
    if (getActiveLike(product)) {
      setFavourites(
        favourites.filter((item: Product) => item.id !== product.id),
      );
    } else {
      setFavourites([...favourites, product]);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, setFavourites, getActiveLike, handleLike }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
