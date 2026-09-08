import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

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
      const exists = prev.find(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
  };

  const isFavorite = (id: string) => favorites.some(p => p.itemId === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const favoritesContext = useContext(FavoritesContext);

  if (!favoritesContext) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return favoritesContext;
};
