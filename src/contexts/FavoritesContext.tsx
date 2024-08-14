import { ReactNode, createContext, useCallback, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';

type FavoritesContextType = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const toggleFavorite = useCallback(
    (item: Product) => {
      const isFavorite = favorites.some(favorite => favorite.id === item.id);
      const updatedFavorites = isFavorite
        ? favorites.filter(favorite => favorite.id !== item.id)
        : [...favorites, item];

      setFavorites(updatedFavorites);
    },
    [favorites, setFavorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
    }),
    [favorites, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
