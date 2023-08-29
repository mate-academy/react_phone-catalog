import React from 'react';
import { Phone } from './types/Phone';
import { useLocalStorage } from './hooks.ts/localStorage';
import { CartItem } from './types/CartItem';

type LocalContextType = {
  favorites: Phone[],
  setFavorites: (v: Phone[]) => void,
  cart: CartItem[],
  setCart: (v: CartItem[]) => void,
};

export const LocalContext = React.createContext<LocalContextType>({
  favorites: [],
  setFavorites: () => {},
  cart: [],
  setCart: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LocalProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Phone[]>('favorites', []);
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const value = {
    favorites,
    setFavorites,
    cart,
    setCart,
  };

  return (
    <LocalContext.Provider value={value}>
      {children}
    </LocalContext.Provider>
  );
};
