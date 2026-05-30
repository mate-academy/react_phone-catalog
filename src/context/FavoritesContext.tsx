import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';
import { FavoritesContextType } from '../types/FavoriteContextType';

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const FAV_KEY = 'nice_gadgets_favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ✅ загрузка из localStorage
  const [favorites, setFavorites] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  });

  // ✅ сохранение при каждом изменении
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // ➕ / ➖ toggle
  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      return exists
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product];
    });
  };

  //
  const isFavorite = (id: string) => {
    return favorites.some(p => p.id === id);
  };

  //
  const count = useMemo(() => favorites.length, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, count }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
