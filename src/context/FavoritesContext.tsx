/* eslint-disable import/extensions */
import { ProductBrief } from '@/types/ProductBrief';
import { createContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: ProductBrief[];
  setFavorites: (products: ProductBrief[]) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<ProductBrief[]>(() => {
    const saved = localStorage.getItem('favorites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const value = { favorites, setFavorites };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
