import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../components/types/Product';

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

interface Props {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        // console.error('Failed to parse favorites', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const targetId = String(product.itemId || product.id);

      const isExist = prevFavorites.some(
        (item: Product) => String(item.itemId || item.id) === targetId,
      );

      if (isExist) {
        return prevFavorites.filter(
          (item: Product) => String(item.itemId || item.id) !== targetId,
        );
      }

      return [...prevFavorites, product];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
