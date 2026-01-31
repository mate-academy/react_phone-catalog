import React, { createContext, useState, useEffect, useContext } from 'react';
import { Phone } from '../types/Phone';
import { FavoritesContextType } from '../types/Favorites';

export type { FavoritesContextType };

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Phone[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  const saveToLocalStorage = (items: Phone[]) => {
    localStorage.setItem('favorites', JSON.stringify(items));
  };

  const addToFavorites = (phone: Phone) => {
    setFavorites(currentFavorites => {
      if (currentFavorites.find(item => item.id === phone.id)) {
        return currentFavorites;
      }

      const newFavorites = [...currentFavorites, phone];

      saveToLocalStorage(newFavorites);

      return newFavorites;
    });
  };

  const removeFromFavorites = (phone: Phone) => {
    setFavorites(currentFavorites => {
      const newFavorites = currentFavorites.filter(
        item => item.id !== phone.id,
      );

      saveToLocalStorage(newFavorites);

      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites error: FavoritesContext is undefined');
  }

  return context;
};
