import { createContext, useContext, type ReactNode } from 'react';
import type { Product } from '../../../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesContextValue {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const isFavorite = (itemId: string) => {
    return favorites.some(product => product.itemId === itemId);
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.itemId === product.itemId);

      if (exists) {
        return prev.filter(item => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  const value: FavoritesContextValue = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
