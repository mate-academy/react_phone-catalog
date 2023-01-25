import React from 'react';
import UseLocalStorage from '../hooks/UseLocalStorage';

type FavoritesContextType = {
  addInFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  favorites: string[];
};

export const FavoritesContext = React.createContext({} as FavoritesContextType);

const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = UseLocalStorage<string[]>('favorites', []);

  const addInFavorites = (id: string) => {
    setFavorites([...favorites, id]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(item => item !== id));
  };

  return (
    <FavoritesContext.Provider value={{
      addInFavorites,
      removeFromFavorites,
      favorites,
    }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
