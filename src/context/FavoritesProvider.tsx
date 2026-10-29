import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/Product';
import { FavoritesContext } from './FavoritesContext';

const STORAGE_KEY = 'favorites';

const readFavorites = (): Product[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

interface Props {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<Product[]>(readFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(current => {
      const exists = current.some(item => item.itemId === product.itemId);

      return exists
        ? current.filter(item => item.itemId !== product.itemId)
        : [...current, product];
    });
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(item => item.itemId === itemId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
