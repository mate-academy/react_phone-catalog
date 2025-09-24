/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Product } from './types/Product';
import { CartItem } from './types/CartItem';

type StoreContextType = {
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

export const StoreContext = React.createContext<StoreContextType>({
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

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);

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
    (item: CartItem) => {
      const exist = cartItems.some(cartItem => cartItem.id === item.id);

      if (!exist) {
        setCartItems([...cartItems, item]);
      }
    },
    [cartItems],
  ); (id: number) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(id);
    } else {
      setCartItems(
        cartItems.map((cartItem: CartItem) =>
          cartItem.id === id ? { ...cartItem, quantity } : cartItem,
        ),
      );
    }
  };

  const removeItemFromFavourites = (id: number) => {
    setFavourites(favourites.filter(favourite => favourite.id !== id));
  };

  const addItemToFavourites = (item: Product) => {
    const exist = favourites.some(favourite => favourite.id === item.id);

    if (!exist) {
      setFavourites([...favourites, item]);
    } else {
      removeItemFromFavourites(item.id);
    }
  };

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
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
