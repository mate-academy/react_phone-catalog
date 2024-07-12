import React, { useMemo, useState } from 'react';
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
  imageProduct: string;
  setImageProduct: (v: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext({} as StateType);

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [autoPlay, setAutoPlay] = useState(true);
  const [imageProduct, setImageProduct] = useState('');
  const [activeMenu, setActiveMenu] = useState(false);
  const [modalWindow, setModalWindow] = useState(false);
  const [favorites, setFavorites] = useLocaleStorage<Product[]>(
    'favorites',
    [],
  );

  const stateTools = useMemo(
    () => ({
      modalWindow,
      setModalWindow,
      favorites,
      setFavorites,
      autoPlay,
      setAutoPlay,
      activeMenu,
      setActiveMenu,
      imageProduct,
      setImageProduct,
    }),
    [
      modalWindow,
      setModalWindow,
      favorites,
      setFavorites,
      autoPlay,
      setAutoPlay,
      activeMenu,
      setActiveMenu,
      imageProduct,
      setImageProduct,
    ],
  );

  return (
    <StateContext.Provider value={stateTools}>{children}</StateContext.Provider>
  );
};
