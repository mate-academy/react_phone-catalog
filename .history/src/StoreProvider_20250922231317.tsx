/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import type { Product } from './ProductsProvider';

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

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
  isAddedToCart: () => false,
  isAddedToFavourites: () => false,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateQuantity: () => {},
  addItemToFavourites: () => {},
  removeItemFromFavourites: () => {},
});

type Props = { children: React.ReactNode };

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<Product[]>([]);

  const isAddedToCart = (productId: number) =>
    cartItems.some(cartItem => cartItem.id === productId);
  const isAddedToFavourites = (productId: number) =>
    favourites.some(f => f.id === productId);

  const addItemToCart = (item: CartItem) => {
    setCartItems(prev =>
      prev.some(ci => ci.id === item.id) ? prev : [...prev, item],
    );
  };

  const removeItemFromCart = (id: number) =>
    setCartItems(prev => prev.filter(ci => ci.id !== id));
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      return removeItemFromCart(id);
    }

    setCartItems(prev =>
      prev.map(ci => (ci.id === id ? { ...ci, quantity } : ci)),
    );
  };

  const removeItemFromFavourites = (id: number) =>
    setFavourites(prev => prev.filter(f => f.id !== id));
  const addItemToFavourites = (item: Product) => {
    setFavourites(prev =>
      prev.some(f => f.id === item.id)
        ? prev.filter(f => f.id !== item.id)
        : [...prev, item],
    );
  };

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

      setCartItems(savedCart);
      const savedFav = JSON.parse(localStorage.getItem('favorites') || '[]');

      setFavourites(savedFav);
    } catch {}
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
    [cartItems, favourites],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
