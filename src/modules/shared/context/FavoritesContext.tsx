import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Product } from '../../../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const isFavorite = useCallback(
    (productId: number) => favorites.some(item => item.id === productId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites(prev =>
        prev.some(item => item.id === product.id)
          ? prev.filter(item => item.id !== product.id)
          : [...prev, product],
      );
    },
    [setFavorites],
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
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
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
