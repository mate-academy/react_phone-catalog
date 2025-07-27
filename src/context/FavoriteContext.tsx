/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Product } from '../types/products';

interface FavoriteContextType {
  productInFavorite: Product[];
  setProductInFavorite: (v: Product) => void;
}

export const FavoriteContext = React.createContext<FavoriteContextType>({
  productInFavorite: [],
  setProductInFavorite: () => {},
});

interface PropsFavoriteContext {
  children: React.ReactNode;
}

export const FavoriteProvider: React.FC<PropsFavoriteContext> = ({
  children,
}) => {
  const [productInFavorite, setProductInFavorite] = useLocalStorage<Product>(
    'favorite',
    [],
  );

  const value = useMemo(
    () => ({ productInFavorite, setProductInFavorite }),
    [productInFavorite],
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
