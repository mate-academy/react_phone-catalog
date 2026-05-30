/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from './types/Product';
import { CartItem } from './types/CartItem';

type ThemeContextType = {
  cartItems: CartItem[];
  favourites: Product[];
  isAddedToCart: (productId: number) => boolean;
  isAddedToFavourites: (productId: number) => boolean;
  addItemToCart: (cartItem: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  addItemToFavourites: (favourite: Product) => void;
  removeItemFromFavourites: (id: number) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  cartItems: [],
  favourites: [],
  isAddedToCart: () => true,
  isAddedToFavourites: () => true,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateQuantity: () => {},
  addItemToFavourites: () => {},
  removeItemFromFavourites: () => {},
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

  const updateQuantity = useCallback(
    (id: number, quantity: number) => {
      if (quantity <= 0) {
        removeItemFromCart(id);
      } else {
        setCartItems(
          cartItems.map((cartItem: CartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem,
          ),
        );
      }
    },
    [cartItems, removeItemFromCart],
  );

  const removeItemFromFavourites = useCallback(
    (id: number) => {
      setFavourites(favourites.filter(favourite => favourite.id !== id));
    },
    [favourites],
  );

  const addItemToFavourites = useCallback(
    (item: Product) => {
      const exist = favourites.some(favourite => favourite.id === item.id);

      if (!exist) {
        setFavourites([...favourites, item]);
      } else {
        removeItemFromFavourites(item.id);
      }
    },
    [favourites, removeItemFromFavourites],
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

