import React, { useMemo, useState } from 'react';

import { Product } from '../../types/Product';

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
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  const value = useMemo(() => (
    { favoriteProducts, setFavoriteProducts }), [favoriteProducts]);

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
};
