import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Product } from '../../types/products';

interface FavoritesContextType {
  favorites: Product[];
  setFavorites: (newValue: Product[]) => void;
}

export const FavoritesContext = React.createContext<FavoritesContextType>({
  favorites: [],
  setFavorites: () => {},
} as FavoritesContextType);

interface Props {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const value = useMemo(
    () => ({
      favorites,
      setFavorites,
    }),
    [favorites, setFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
