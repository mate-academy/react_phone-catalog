import { createContext, useContext, useEffect, useState } from 'react';

type FavoritesContextType = {
  favorites: number[];
  isFavorite: (productId: number) => boolean;
  toggleFavorites: (productId: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = 'favorites';

const getInitialFavorites = (): number[] => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((id): id is number => typeof id === 'number');
  } catch {
    return [];
  }
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  const toggleFavorites = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorites }}
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
