import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

const getProductKey = (product: Product) =>
  product.itemId || String(product.id);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    const key = getProductKey(product);

    setFavorites(prev => {
      const exists = prev.some(item => getProductKey(item) === key);

      return exists
        ? prev.filter(item => getProductKey(item) !== key)
        : [...prev, product];
    });
  };

  const isFavorite = (productId: string) =>
    favorites.some(product => getProductKey(product) === productId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
