import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Product } from '../types/Product';

export interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
  totalFavorites: number;
}

const FAVORITES_STORAGE_KEY = 'favorite_products';

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const isFavorite = useCallback(
    (itemId: string) => {
      return favorites.some(p => p.itemId === itemId);
    },
    [favorites],
  );

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.itemId === product.itemId);

      if (exists) {
        return prev.filter(p => p.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  }, []);

  const totalFavorites = useMemo(() => favorites.length, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      totalFavorites,
    }),
    [favorites, toggleFavorite, isFavorite, totalFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
