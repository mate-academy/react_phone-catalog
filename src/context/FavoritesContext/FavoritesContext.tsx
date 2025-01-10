import { createContext, useContext } from 'react';
import { Product } from '../../types/Product';
import { useState, useEffect } from 'react';

interface FavoritesContextType {
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => void;
  favorites: Product[];
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const load = localStorage.getItem('favorites');

    if (load) {
      setFavorites(JSON.parse(load));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prevFavorites =>
      prevFavorites.some(fav => fav.id === product.id)
        ? prevFavorites.filter(fav => fav.id !== product.id)
        : [...prevFavorites, product],
    );
  };

  const isFavorite = (id: number): boolean =>
    favorites.some(fav => fav.id === id);
  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, totalFavorites }}
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
