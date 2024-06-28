/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type InitialType = {
  favoritesProducts: Product[] | [];
  setFavoritesProducts: React.Dispatch<React.SetStateAction<[] | Product[]>>;
};

const initialValue: InitialType = {
  favoritesProducts: [],
  setFavoritesProducts: () => {},
};

export const FavoritesContext = React.createContext(initialValue);

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const storageFavorites = localStorage.getItem('favoriteProducts');

  const [favoritesProducts, setFavoritesProducts] = useState<Product[] | []>(
    storageFavorites ? JSON.parse(storageFavorites) : [],
  );

  useEffect(() => {
    const fav = localStorage.getItem('favoriteProducts');

    if (fav) {
      setFavoritesProducts(JSON.parse(fav));
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('favoriteProducts');

    localStorage.setItem('favoriteProducts', JSON.stringify(favoritesProducts));
  }, [favoritesProducts]);

  return (
    <FavoritesContext.Provider
      value={{
        favoritesProducts,
        setFavoritesProducts,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
