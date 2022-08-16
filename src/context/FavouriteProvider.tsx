import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/Product';

type FavouriteContextType = {
  favorites: Product[],
  addedToFavorites: (item: Product) => void,
  removefromFavorites: (item: Product) => void,
};

export const FavouriteContext = React.createContext({} as FavouriteContextType);

export const FavouriteProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const getLocalStorage = () => {
    if (localStorage.getItem('favourite') !== null) {
      setFavorites(JSON.parse(localStorage.getItem('favourite') || ''));
    }
  };

  const updateStorage = () => {
    if (favorites.length) {
      localStorage.setItem('favourite', JSON.stringify(favorites));
    } else {
      localStorage.removeItem('favourite');
    }
  };

  const addedToFavorites = (item: Product) => {
    setFavorites(prevState => ([
      ...prevState,
      item,
    ]));
    item.inFavourite = true; // eslint-disable-line no-param-reassign
  };

  const removefromFavorites = (item: Product) => {
    setFavorites(favorites.filter((product) => product.id !== item.id));
    item.inFavourite = false; // eslint-disable-line no-param-reassign
  };

  const contextValue = useMemo(() => {
    return {
      favorites,
      addedToFavorites,
      removefromFavorites,
    };
  }, [favorites]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    updateStorage();
  }, [favorites]);

  return (
    <FavouriteContext.Provider value={contextValue}>
      {children}
    </FavouriteContext.Provider>
  );
};
