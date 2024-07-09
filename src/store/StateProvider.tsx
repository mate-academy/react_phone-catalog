import React, { useEffect, useState } from 'react';
import { Product } from '../types/ContextType/Product';
import { useLocaleStorage } from '../utils/hooks/useLocalStorage';

type StateType = {
  modalWindow: boolean;
  setModalWindow: (v: boolean) => void;
  autoPlay: boolean;
  setAutoPlay: (v: boolean) => void;
  activeMenu: boolean;
  setActiveMenu: (v: boolean) => void;
  favorites: Product[];
  setFavorites: (v: Product[] | ((s: Product[]) => Product[])) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<StateType>({
  modalWindow: false,
  setModalWindow: () => [],
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
  const [modalWindow, setModalWindow] = useState(false);
  const [favorites, setFavorites] = useLocaleStorage<Product[]>(
    'favorites',
    [],
  );

  const offOverflowForAsideMenu = (stateMenu: boolean) => {
    if (stateMenu) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    offOverflowForAsideMenu(activeMenu);
  }, [activeMenu]);

  const stateTools = {
    modalWindow,
    setModalWindow,
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
