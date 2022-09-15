import React, { createContext, useState, useContext } from 'react';

type Props = {
  countCart: number,
  counterCart: (count: number) => void,
  countFavorites: number,
  counterFavorites: (count: number) => void,
};

const Context = createContext<Props | null>(null);

export const useCounter = () => {
  return useContext(Context);
};

export const ContextProvider: React.FC = ({ children }) => {
  const checkCartLocation = localStorage.getItem('cart');
  const checkFavoritesLocation = localStorage.getItem('favorites');
  let cartFromLocal = [];
  let favoritesFromLocal = [];

  if (checkCartLocation) {
    cartFromLocal = JSON.parse(checkCartLocation);
  }

  if (checkFavoritesLocation) {
    favoritesFromLocal = JSON.parse(checkFavoritesLocation);
  }

  const [countCart, setCountCart] = useState<number>(cartFromLocal.length);
  const [countFavorites, setCountFavorites] = useState<number>(favoritesFromLocal.length);

  const counterCart = (count: number) => {
    setCountCart(prev => prev + count);
  };

  const counterFavorites = (count: number) => {
    setCountFavorites(prev => prev + count);
  };

  return (
    <Context.Provider value={{
      countCart,
      counterCart,
      countFavorites,
      counterFavorites,
    }}
    >
      {children}
    </Context.Provider>
  );
};
