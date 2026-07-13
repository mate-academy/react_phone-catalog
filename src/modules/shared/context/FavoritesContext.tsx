import React, { createContext, useContext, useState } from 'react';

type FavoriteItem = {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const isExists = prev.find(f => f.id === item.id);

      if (isExists) {
        return prev.filter(f => f.id !== item.id);
      }

      return [...prev, item];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
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
