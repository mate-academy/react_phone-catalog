import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const FAVORITES_KEY = 'phone-catalog-favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.itemId === product.itemId);

      if (exists) {
        return prev.filter(item => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favorites.some(item => item.itemId === itemId),
    [favorites],
  );

  const favoritesCount = favorites.length;

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      favoritesCount,
    }),
    [favorites, toggleFavorite, isFavorite, favoritesCount],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return ctx;
};
