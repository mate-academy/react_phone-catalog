/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
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
  const [favoritesProducts, setFavoritesProducts] = useState<Product[] | []>(
    [],
  );

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
