import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const syncFavorites = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) {
        setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', syncFavorites);
    return () => window.removeEventListener('storage', syncFavorites);
  }, []);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(p => String(p.id) === String(product.id))
        ? prev.filter(p => String(p.id) !== String(product.id))
        : [...prev, { ...product, id: String(product.id) }],
    );
  };

  const isFavorite = (id: string) =>
    favorites.some(p => String(p.id) === String(id));

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
