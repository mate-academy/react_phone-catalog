import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

interface FavoriteContextValue {
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  favoritesLength: number;
}

const FavoriteContext
= createContext<FavoriteContextValue | undefined>(undefined);

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new
    Error('useFavoriteContext must be used within a FavoriteContextProvider');
  }

  return context;
};

export const FavoriteContextProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToFavorites = (productId: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(
      (favId) => favId !== productId,
    ));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const favoritesLength = favorites.length;

  const contextValue: FavoriteContextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    favoritesLength,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
