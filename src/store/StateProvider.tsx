import React, { useState } from 'react';
import { Products } from '../types/ContextType/Products';

type StateType = {
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
  activeMenu: boolean;
  setActiveMenu: (v: boolean) => void;
  favorites: Products[];
  setFavorites: (v: Products[] | ((s: Products[]) => Products[])) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
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
  const [favorites, setFavorites] = useState<Products[]>([]);

  const stateTools = {
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
