import { createContext, useContext, useEffect, useState } from 'react';
import { FavoritesContextValue } from '../interfaces/FavoritesContextValue';
import { Product } from '../../Catalog/interfaces/Product';

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favorites');

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product],
    );
  };

  const isFavorite = (id: number) => favorites.some(p => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }

  return ctx;
};
