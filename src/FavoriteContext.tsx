import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

interface FavoriteContextValue {
  basket: string[];
  favorites: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addToBasket: (productId: string) => void;
  removeFromBasket: (productId: string) => void;
  favoritesLength: number;
  basketLength: number;
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

export const useBasketContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new
    Error('useBasketContext must be used within a FavoriteContextProvider');
  }

  return context;
};

export const FavoriteContextProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [basket, setBasket] = useState<string[]>([]);

  const addToFavorites = (productId: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(
      (favId) => favId !== productId,
    ));
  };

  const addToBasket = (productId: string) => {
    setBasket((prevBasket) => [...prevBasket, productId]);
  };

  const removeFromBasket = (productId: string) => {
    setBasket((prevBasket) => prevBasket.filter(
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

  useEffect(() => {
    const storedBasket = localStorage.getItem('basket');

    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const basketLength = basket.length;

  const contextValue: FavoriteContextValue = {
    favorites,
    basket,
    addToFavorites,
    removeFromFavorites,
    addToBasket,
    removeFromBasket,
    favoritesLength,
    basketLength,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
