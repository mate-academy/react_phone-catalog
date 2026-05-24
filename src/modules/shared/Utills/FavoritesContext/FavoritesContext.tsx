import React, { ReactNode, useContext, useEffect, useState } from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

interface Props {
  children: ReactNode;
}
/* eslint-disable @typescript-eslint/indent */
export const FavoritesContext = React.createContext<
  FavoritesContextType | undefined
>(undefined);

export const FavoritesContextProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorites');

    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const updated = isFav
        ? prev.filter(favId => favId !== id)
        : [...prev, id];

      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);

  if (!ctx) {
    throw new Error('useProducts must be used inside FavoritesContextProvider');
  }

  return ctx;
};
