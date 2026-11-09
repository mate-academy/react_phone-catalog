import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../../../types/Product';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const STORAGE_KEY = 'favorites';

interface FavoritesContextValue {
  favorites: Product[];
  isFavorite: (itemId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface Props {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Product[]>(() =>
    loadFromStorage<Product[]>(STORAGE_KEY, []),
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEY, favorites);
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (itemId: string) =>
        favorites.some(product => product.itemId === itemId),
      toggleFavorite: (product: Product) => {
        setFavorites(current =>
          current.some(item => item.itemId === product.itemId)
            ? current.filter(item => item.itemId !== product.itemId)
            : [...current, product],
        );
      },
    }),
    [favorites],
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
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return context;
}
