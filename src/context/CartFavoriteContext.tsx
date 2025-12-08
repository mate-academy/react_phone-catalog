import React, { FC } from 'react';
import { createContext, useContext, useState } from 'react';
import { Product } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Props = {
  children: React.ReactNode;
};

type FavoriteItem = Pick<
  Product,
  'name' | 'id' | 'image' | 'price' | 'screen' | 'capacity' | 'ram'
>;

const CartFavoriteContext = createContext({});

export const CartFavoriteProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

  // ----- Cart

  const addToCart = (product: CartProduct) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id! === productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ----- Favorites

  const toggleFavorite = (product: FavoriteItem) => {
    setFavoriteItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const value = {
    cartItems,
    favoriteItems,
    addToCart,
    removeFromCart,
    clearCart,
    toggleFavorite,
  };

  return (
    <CartFavoriteContext.Provider value={value}>
      {children}
    </CartFavoriteContext.Provider>
  );
};

export const useCartFavorite = () => {
  return useContext(CartFavoriteContext);
};
