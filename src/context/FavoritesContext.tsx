/* eslint-disable prettier/prettier */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'favorites';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
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
    setFavorites((prev) => {
      const exists = prev.some((item) => item.itemId === product.itemId);

      if (exists) {
        return prev.filter((item) => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (itemId: string) =>
    favorites.some((item) => item.itemId === itemId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
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
