import React, { createContext, useContext } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(item => item.id === product.id)
        ? prev.filter(item => item.id !== product.id)
        : [...prev, product],
    );
  };

  const isFavorite = (id: string) => favorites.some(item => item.id === id);

  const value = { favorites, toggleFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
