import React, { createContext, useState, useEffect } from 'react';
import { Product } from '../../../shared/types/Product';
import toast from 'react-hot-toast';

export interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isExist = prevFavorites.some(item => item.id === product.id);

      if (isExist) {
        toast('Removed from favorites', { icon: '💔' });

        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        toast('Added to favorites', { icon: '❤️' });

        return [...prevFavorites, product];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
