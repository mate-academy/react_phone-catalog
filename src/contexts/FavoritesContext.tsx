import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

const FAVORITES_KEY = 'favorites';

type FavoritesContextType = {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (itemId: Product['itemId']) => void;
  isFavorite: (itemId: Product['itemId']) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (product: Product) => {
    const updated = [...favorites, product];

    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const removeFavorite = (itemId: string) => {
    const updated = favorites.filter(p => p.itemId !== itemId);

    setFavorites(updated);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  const isFavorite = (itemId: string) =>
    favorites.some(p => p.itemId === itemId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
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
