import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { getProductId, normalizeProduct } from '../utils/product';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

const readFavorites = (): Product[] => {
  try {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(readFavorites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback((product: Product) => {
    const normalized = normalizeProduct(product);
    const productId = getProductId(normalized);

    setFavorites(prev => {
      if (prev.some(item => getProductId(item) === productId)) {
        return prev;
      }

      return [...prev, normalized];
    });
  }, []);

  const removeFromFavorites = useCallback((productId: string) => {
    setFavorites(prev => prev.filter(item => getProductId(item) !== productId));
  }, []);

  const isFavorite = useCallback(
    (productId: string) =>
      favorites.some(item => getProductId(item) === productId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }),
    [favorites, addToFavorites, removeFromFavorites, isFavorite],
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
