import React, { useMemo } from 'react';

import { Product } from '../../types/Product';
import { useLocalStorage } from '../../utils/useLocalStorage';

type ProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  favoriteProducts: Product[];
  setFavoriteProducts: (value: Product[]) => void;
};

export const FavContext = React.createContext<ContextProps>({
  favoriteProducts: [],
  setFavoriteProducts: () => {},
});

export const FavProvider: React.FC<ProviderProps> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts]
    = useLocalStorage('favorites', []);

  const value = useMemo(() => (
    { favoriteProducts, setFavoriteProducts }), [favoriteProducts]);

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};
