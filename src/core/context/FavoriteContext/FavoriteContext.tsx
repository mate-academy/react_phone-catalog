import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import { FavoriteContextValue } from './types';

const noop = () => {
  //
};

const FavoriteContext = createContext<FavoriteContextValue>({
  basket: [],
  favorites: [],
  addToBasket: noop,
  addToFavorites: noop,
  removeFromFavorites: noop,
  removeFromBasket: noop,
  removeFromAllBasket: noop,
  changeQuantity: noop,
  favoritesLength: 0,
  basketLength: 0,
});

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      'useFavoriteContext must be used within a FavoriteContextProvider',
    );
  }

  return context;
};

export const useBasketContext = () => {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      'useBasketContext must be used within a FavoriteContextProvider',
    );
  }

  return context;
};

export const FavoriteContextProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [basket, setBasket] = useState<
  FavoriteContextValue['basket']>([]);

  const addToFavorites = (productId: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter(
      (favId) => favId !== productId,
    ));
  };

  const changeQuantity = (productId: string, path: number) => {
    setBasket(prev => prev.map(
      el => {
        if (el.id !== productId) {
          return el;
        }

        const newQuantity = el.quantity + path;

        if (newQuantity <= 0) {
          return el;
        }

        return { ...el, quantity: el.quantity + path };
      },
    ));
  };

  const addToBasket = (productId: string) => {
    setBasket((prevBasket) => [
      ...prevBasket,
      {
        id: productId,
        price: 0,
        quantity: 1,
      },
    ]);
  };

  const removeFromBasket = (productId: string) => {
    setBasket((prevBasket) => prevBasket
      .filter((product) => product.id !== productId));
  };

  const removeFromAllBasket = (productId: string) => {
    setBasket((prevBasket) => prevBasket.filter(
      (product) => product.id !== productId,
    ));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedBasket = localStorage.getItem('basket');

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const contextValue: FavoriteContextValue = {
    favorites,
    basket,
    addToFavorites,
    removeFromFavorites,
    addToBasket,
    removeFromBasket,
    removeFromAllBasket,
    changeQuantity,
    favoritesLength: favorites.length,
    basketLength: basket.length,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};
