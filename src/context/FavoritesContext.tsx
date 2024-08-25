import React, { useState, useCallback } from 'react';
import { Product } from '../types/types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  favoriteItems: Product[];
  updateFavoriteItems: (values: Product[]) => void;
};

export const FavoritesContext = React.createContext<ContextType>({
  favoriteItems: [],
  updateFavoriteItems: () => {},
});

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

  const updateFavoriteItems = useCallback((data: Product[]) => {
    if (data) {
      setFavoriteItems(data);
    }
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoriteItems, updateFavoriteItems }}>
      {children}
    </FavoritesContext.Provider>
  );
};
