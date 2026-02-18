import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const localFavorites = window.localStorage.getItem('favorites');

      return localFavorites ? JSON.parse(localFavorites) : [];
    } catch (error) {
      // console.error('Failed to parse favorites from localStorage', error);

      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      // console.error('Failed to save favorites to localStorage', error);
    }
  }, [favorites]);

  const addToFavorites = useCallback((product: Product) => {
    setFavorites(prevFavorites => [...prevFavorites, product]);
  }, []);

  const removeFromFavorites = useCallback((itemId: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(item => item.itemId !== itemId),
    );
  }, []);

  const isFavorite = useCallback(
    (itemId: string) => favorites.some(item => item.itemId === itemId),
    [favorites],
  );

  const totalFavorites = useMemo(() => favorites.length, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      totalFavorites,
    }),
    [
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      totalFavorites,
    ],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
