import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
  totalCount: number;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'favorites';

type Props = {
  children: React.ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);

      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (id: number) => favorites.some(item => item.id === id);
  const totalCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, totalCount }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
