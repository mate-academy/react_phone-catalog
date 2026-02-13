/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useCallback, useMemo } from 'react';
import { Product } from '../types/ProductType';
// import productsData from '../../public/api/products.json';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const FavoritesContext = createContext<{
  favProducts: Product[];
  toggleFavorites: (product: Product) => void;
}>({
  favProducts: [],
  toggleFavorites: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favProducts, setFavProducts] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  const toggleFavorites = useCallback(
    (product: Product) => {
      setFavProducts(prev => {
        if (prev.some(p => p.id === product.id)) {
          return prev.filter(p => p.id !== product.id);
        } else {
          return [...prev, product];
        }
      });
    },
    [setFavProducts],
  );

  const valueProps = useMemo(
    () => ({
      toggleFavorites,
      favProducts,
    }),
    [toggleFavorites, favProducts],
  );

  return (
    <FavoritesContext.Provider value={valueProps}>
      {children}
    </FavoritesContext.Provider>
  );
};
