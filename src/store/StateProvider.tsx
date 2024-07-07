import React, { useEffect, useState } from 'react';
import { Products } from '../types/ContextType/Products';

type StateType = {
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
  activeMenu: boolean;
  setActiveMenu: (v: boolean) => void;
  favorites: Products[];
  setFavorites: (v: Products[] | ((s: Products[]) => Products[])) => void;
  cart: Products[];
  setToCart: (v: Products[] | ((s: Products[]) => Products[])) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  cart: [],
  setToCart: () => [],
  favorites: [],
  setFavorites: () => [],
  autoPlay: false,
  setAutoPlay: () => {},
  activeMenu: false,
  setActiveMenu: () => {},
});

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeMenu, setActiveMenu] = useState(false);
  const [cart, setToCart] = useState<Products[]>(() => {
    const data = localStorage.getItem('cart');

    if (data === null) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem('cart');

      return [];
    }
  });
  const [favorites, setFavorites] = useState<Products[]>(() => {
    const data = localStorage.getItem('favorites');

    if (data === null) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem('favorites');

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  });

  const stateTools = {
    cart,
    setToCart,
    favorites,
    setFavorites,
    autoPlay,
    setAutoPlay,
    activeMenu,
    setActiveMenu,
  };

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
