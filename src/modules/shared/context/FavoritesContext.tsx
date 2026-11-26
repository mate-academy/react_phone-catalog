import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import type { Product } from '../types/Product';

interface FavoritesContextValue {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = 'favorites';

function loadFavorites(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Product =>
        item &&
        typeof item.id === 'number' &&
        typeof item.itemId === 'string' &&
        typeof item.name === 'string',
    );
  } catch {
    return [];
  }
}

function saveFavorites(favorites: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore quota errors
  }
}

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setFavorites(loadFavorites());
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      saveFavorites(favorites);
    }
  }, [favorites, initialized]);

  const toggleFavorite = useCallback((product: Product): void => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }

      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (id: number): boolean => {
      return favorites.some(p => p.id === id);
    },
    [favorites],
  );

  const count = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        count,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
