import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Product } from '../../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (!savedFavorites) {
      return [];
    }

    try {
      return JSON.parse(savedFavorites) as Product[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(currentFavorites => {
      const exists = currentFavorites.some(item => item.id === product.id);

      if (exists) {
        return currentFavorites.filter(item => item.id !== product.id);
      }

      return [...currentFavorites, product];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
