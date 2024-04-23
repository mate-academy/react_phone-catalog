import React, { createContext, useEffect } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PropsFavoriteContext = {
  favoritesProducts: Product[];
  setFavoritesProducts: (favoritesProducts: Product[]) => void;
};

type Props = {
  children: React.ReactNode;
};

export const FavoriteContext = createContext<PropsFavoriteContext>({
  favoritesProducts: [],
  setFavoritesProducts: () => {},
});

export const FavoriteProvider: React.FC<Props> = ({ children }) => {
  const [favoritesProducts, setFavoritesProducts] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  useEffect(() => {
    setFavoritesProducts(favoritesProducts);
  }, [favoritesProducts, setFavoritesProducts]);

  return (
    <FavoriteContext.Provider
      value={{ favoritesProducts, setFavoritesProducts }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
