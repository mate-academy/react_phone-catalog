import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../types/types';

type AppContextType = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  favourites: Product[];
  setFavourites: React.Dispatch<React.SetStateAction<Product[]>>;
  cartCount: number;
  favouritesCount: number;
  getCart: () => Product[];
  getFavourites: () => Product[];
  clearCart: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const getCart = (): Product[] => {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  };
  const getFavourites = (): Product[] => {
    const data = localStorage.getItem('favourites');
    return data ? JSON.parse(data) : [];
  };

  const [cart, setCart] = useState<Product[]>(getCart());
  const [favourites, setFavourites] = useState<Product[]>(getFavourites());

  const cartCount = cart.length;
  const favouritesCount = favourites.length;

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    setCart,
    favourites,
    setFavourites,
    cartCount,
    favouritesCount,
    getCart,
    getFavourites,
    clearCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
