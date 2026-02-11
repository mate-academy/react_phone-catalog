import { createContext, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = useLocalStorageState<string[]>(
    'favorites',
    [],
  );

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const value = { favorites, toggleFavorite, isFavorite };

  return (
    <FavoritesContext.Provider value={value}>
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
