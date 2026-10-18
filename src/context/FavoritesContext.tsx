import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks';

interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    'favorites',
    [],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: productId => favoriteIds.includes(productId),
      toggleFavorite: productId =>
        setFavoriteIds(current =>
          current.includes(productId)
            ? current.filter(id => id !== productId)
            : [...current, productId],
        ),
    }),
    [favoriteIds, setFavoriteIds],
  );

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
