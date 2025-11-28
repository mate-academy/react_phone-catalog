import React, { createContext, useEffect, useState, useContext } from 'react';
import { Product } from '../../types/Product';

export type FavContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  totalFavorites: number;
};

const FavContext = createContext<FavContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const totalFavorites = favorites.length;

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite, totalFavorites }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavContext);

  if (!context) {
    {
      throw new Error('useFavorites must be used within FavoritesProvider');
    }
  }

  return context;
};
