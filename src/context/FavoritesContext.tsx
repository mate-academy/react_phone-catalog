import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesState {
  favorites: Product[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesState | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>(
    'favorites',
    [],
  );

  const isFavorite = useCallback(
    (id: number) => favorites.some(p => p.id === id),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites(prev =>
        prev.some(p => p.id === product.id)
          ? prev.filter(p => p.id !== product.id)
          : [...prev, product],
      );
    },
    [setFavorites],
  );

  const clear = useCallback(() => setFavorites([]), [setFavorites]);

  const value = useMemo<FavoritesState>(
    () => ({ favorites, isFavorite, toggleFavorite, clear }),
    [favorites, isFavorite, toggleFavorite, clear],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return ctx;
};
