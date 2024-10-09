/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from './LocaleStorage';
import { Products } from './types/products';

interface AppContextProps {
  favorites: Products[];
  setFavorites: (favorites: Products[]) => void;
  cart: Products[];
  setCart: (cart: Products[]) => void;
}

const AppContext = createContext<AppContextProps>({
  favorites: [],
  setFavorites: () => {},
  cart: [],
  setCart: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Products[]>(
    'favorites',
    [],
  );
  const [cart, setCart] = useLocalStorage<any[]>('cart', []);

  return (
    <AppContext.Provider value={{ favorites, setFavorites, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
