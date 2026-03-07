import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
  totalCount: number;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  totalCount: 0,
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
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
      const exists = prev.find(p => p.itemId === product.itemId);

      if (exists) {
        return prev.filter(p => p.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(p => p.itemId === itemId);
  };

  const totalCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, totalCount }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
