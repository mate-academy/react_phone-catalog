import React, { createContext, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string | number) => void;
  isFavorite: (id: string | number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favourites');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string | number) => {
    const stringId = String(id);

    setFavorites(prev => {
      if (prev.includes(stringId)) {
        return prev.filter(favId => favId !== stringId);
      }

      return [...prev, stringId];
    });
  };

  const isFavorite = (id: string | number) => {
    return favorites.includes(String(id));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
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
