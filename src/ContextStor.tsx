/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from './LocaleStorage';

interface FavoriteItem {
  id: string;
  name: string;
}

interface AppContextProps {
  favorites: FavoriteItem[];
  setFavorites: (favorites: FavoriteItem[]) => void;
  cart: any[];
  setCart: (cart: any[]) => void;
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
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>(
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
