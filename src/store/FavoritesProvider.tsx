import React, { useState } from 'react';
import { Product } from '../types/Product';

type Props = {
  children: React.ReactNode;
};

export const FavoritesContext = React.createContext<{
  favorites: Product[];
}>({
  favorites: [],
});

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites] = useState<Product[]>([]);

  console.log('FAVORITES', favorites);

  const getStoreValues = () => {
    return { favorites };
  };

  return (
    <FavoritesContext.Provider value={getStoreValues()}>
      {children}
    </FavoritesContext.Provider>
  );
};
