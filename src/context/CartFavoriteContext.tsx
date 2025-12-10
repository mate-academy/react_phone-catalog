import React, { FC } from 'react';
import { createContext, useContext, useState } from 'react';
import { ProductType } from '../types/Product';
import { CartProduct } from '../types/CartProduct';

type Props = {
  children: React.ReactNode;
};

type CartFavoriteContextType = {
  cartItems: ProductType[];
  favoriteItems: ProductType[];
  addToCart: (item: ProductType) => void;
  toggleFavorite?: (item: ProductType) => void;
  clearCart: () => void;
  removeFromCart?: (productId: string) => void;
};

const CartFavoriteContext = createContext<CartFavoriteContextType | undefined>(
  undefined,
);

export const CartFavoriteProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<ProductType[]>([]);

  // ----- Cart

  const addToCart = (product: ProductType): void => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id! === productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ----- Favorites

  const toggleFavorite = (product: ProductType) => {
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
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    toggleFavorite: () => {},
  };

  return (
    <CartFavoriteContext.Provider value={value}>
      {children}
    </CartFavoriteContext.Provider>
  );
};

export const useCartFavorite = () => {
  const context = useContext(CartFavoriteContext);
  if (!context)
    throw new Error('useCartFavorite must be used within CartFavoriteProvider');
  return useContext(CartFavoriteContext) as CartFavoriteContextType;
};
