/* eslint-disable @typescript-eslint/indent */
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext<{
  favorites: string[];
  toggleFavorite: (id: string) => void;
}>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
