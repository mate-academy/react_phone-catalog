import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../../types/Product';

interface FavoritesContextValue {
  favorites: Product[];
  favoritesCount: number;
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = 'favorites';

function loadFavorites(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

interface Props {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Product[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(current => {
      const exists = current.some(item => item.itemId === product.itemId);

      if (exists) {
        return current.filter(item => item.itemId !== product.itemId);
      }

      return [...current, product];
    });
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favorites.some(item => item.itemId === itemId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      favoritesCount: favorites.length,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
}
