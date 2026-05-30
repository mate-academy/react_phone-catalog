import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavs = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];

      localStorage.setItem('favorites', JSON.stringify(newFavs));

      return newFavs;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
