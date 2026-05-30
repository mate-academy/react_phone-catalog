import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const storageKey = 'phone_catalog_favorites';

function readFavorites(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(storageKey);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<string[]>(() => readFavorites());

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(current =>
      current.includes(id)
        ? current.filter(value => value !== id)
        : [...current, id],
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, count: favorites.length }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }

  return context;
};
