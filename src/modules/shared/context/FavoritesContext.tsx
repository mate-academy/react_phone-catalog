import { createContext, useContext, useMemo, ReactNode } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextValue = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const isFavorite = (id: number) => favorites.some(item => item.id === id);

  const toggleFavorite = (product: Product) => {
    setFavorites(
      isFavorite(product.id)
        ? favorites.filter(item => item.id !== product.id)
        : [...favorites, product],
    );
  };

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
};
