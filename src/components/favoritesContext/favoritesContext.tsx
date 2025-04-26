import { createContext, useContext, useState, ReactNode } from 'react';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const updatedFavorites = prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      return updatedFavorites;
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
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
};
