import React, { createContext, useCallback, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FAVORITES_KEY = 'favorites';

type FavoritesContextType = {
  favorites: string[];
  toggleProductInFavorite: (id: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    FAVORITES_KEY,
    [],
  );

  const toggleProductInFavorite = useCallback(
    (id: string) =>
      setFavorites(
        favorites.includes(id)
          ? favorites.filter(productId => productId !== id)
          : [...favorites, id],
      ),
    [setFavorites, favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleProductInFavorite,
      }}
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
