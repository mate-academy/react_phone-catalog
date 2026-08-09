import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);

  function toggleFavorite(product: Product) {
    setFavorites(prev => {
      const alreadyExists = prev.some(item => item.itemId === product.itemId);

      if (alreadyExists) {
        return prev.filter(item => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }

  function isFavorite(itemId: string) {
    return favorites.some(item => item.itemId === itemId);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
