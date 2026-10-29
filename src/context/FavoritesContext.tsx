import React, { createContext, ReactNode } from 'react';
import { Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
};

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

type Props = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const toggleFavorite = (product: Product) => {
    const isFavorite = favorites.some(fav => fav.itemId === product.itemId);

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.itemId !== product.itemId));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
