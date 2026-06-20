import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/product';

interface FavoriteItem {
  product: Product;
}

interface FavoriteContextType {
  favorite: FavoriteItem[];
  addToFavorite: (product: Product) => void;
  removeFromFavorite: (productId: string) => void;
  totalFavoriteItems: number;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorite, setFavorite] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('favorite');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorite', JSON.stringify(favorite));
  }, [favorite]);

  const addToFavorite = useCallback((product: Product) => {
    setFavorite(prev => {
      const exists = prev.some(item => item.product.id === product.id);

      if (exists) {
        return prev;
      }

      return [...prev, { product }];
    });
  }, []);

  const removeFromFavorite = useCallback((productId: string) => {
    setFavorite(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const totalFavoriteItems = useMemo(() => {
    return favorite.length;
  }, [favorite]);

  const value = useMemo(
    () => ({
      favorite,
      addToFavorite,
      removeFromFavorite,
      totalFavoriteItems,
    }),
    [favorite, addToFavorite, removeFromFavorite, totalFavoriteItems],
  );

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error('useFavorite must be used within FavoriteProvider');
  }

  return context;
};
