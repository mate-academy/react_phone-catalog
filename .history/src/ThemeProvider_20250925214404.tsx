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


  const isAddedToCart = useCallback(
    (productId: number) =>
      cartItems.some(cartItem => cartItem.id === productId),
    [cartItems],
  );

  const isAddedToFavourites = useCallback(
    (productId: number) =>
      favourites.some(favourite => favourite.id === productId),
    [favourites],
  );

  const addItemToCart = useCallback(
    (item: CartItem) => {
      const exist = cartItems.some(cartItem => cartItem.id === item.id);

      if (!exist) {
        setCartItems([...cartItems, item]);
      }
    },
    [cartItems],
  );

  const removeItemFromCart = useCallback(
    (id: number) => {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
    },
    [cartItems],
  );


  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

    setCartItems(savedCart);
    const savedFavourites = JSON.parse(
      localStorage.getItem('favorites') || '[]',
    );

    setFavourites(savedFavourites);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favourites));
  }, [favourites]);

  const value = useMemo(
    () => ({
      cartItems,
      favourites,
      isAddedToCart,
      isAddedToFavourites,
      addItemToCart,
      removeItemFromCart,
      updateQuantity,
      addItemToFavourites,
      removeItemFromFavourites,
    }),
    [
      cartItems,
      favourites,
      addItemToCart,
      addItemToFavourites,
      isAddedToCart,
      isAddedToFavourites,
      removeItemFromCart,
      removeItemFromFavourites,
      updateQuantity,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

