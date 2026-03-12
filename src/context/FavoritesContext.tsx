import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Product } from '../types/Product';

/* ---------- helpers ---------- */

const STORAGE_KEY = 'favorites';

function loadFavorites(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(items: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/* ---------- context ---------- */

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  totalFavorites: 0,
});

export const useFavorites = () => useContext(FavoritesContext);

/* ---------- provider ---------- */

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }

      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.some(p => p.id === productId),
    [favorites],
  );

  const value: FavoritesContextType = {
    favorites,
    toggleFavorite,
    isFavorite,
    totalFavorites: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
