import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Product } from '../types';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');

      return saved ? (JSON.parse(saved) as Product[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
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

export const useFavorites = (): FavoritesContextType => {
  const ctx = useContext(FavoritesContext);

  if (ctx === undefined) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return ctx;
};
