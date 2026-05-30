/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from './types/Product';
import { CartItem } from './types/CartItem';

type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCartItems(savedCart);
    const savedFavourites = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );


  const value = useMemo(
    () => ({
      theme,
      setTheme,

    }),
    [
      theme,
      setTheme,

    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
});
