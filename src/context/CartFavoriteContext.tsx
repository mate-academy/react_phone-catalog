import React, { FC } from 'react';
import { createContext, useContext, useState } from 'react';
import { ProductAllType } from '../types/Product';

type Props = {
  children: React.ReactNode;
};

type CartFavoriteContextType = {
  cartItems: ProductAllType[];
  favoriteItems: ProductAllType[];
  addToCart: (item: ProductAllType) => void;
  toggleFavorite: (item: ProductAllType) => void;
  clearCart: () => void;
  removeFromCart: (productId: string) => void;
  updateCounterCart: (productId: string, count: number) => void;
};

const CartFavoriteContext = createContext<CartFavoriteContextType>({
  cartItems: [],
  favoriteItems: [],
  addToCart: () => {},
  clearCart: () => {},
  toggleFavorite: () => {},
  removeFromCart: () => {},
  updateCounterCart: () => {},
});

export const CartFavoriteProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductAllType[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<ProductAllType[]>([]);

  // ----- Cart

  const addToCart = (product: ProductAllType): void => {
    setCartItems(prev =>
      prev.find(item => String(item.id) === String(product.id))
        ? prev
        : [...prev, { ...product, count: 1 }],
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev =>
      prev.filter(item => String(item.id) !== String(productId)),
    );
  };

  const updateCounterCart = (productId: string, count: number) => {
    setCartItems(prev =>
      prev.map(item =>
        String(item.id) === String(productId)
          ? { ...item, count: count }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // ----- Favorites

  const toggleFavorite = (product: ProductAllType) => {
    setFavoriteItems(prev => {
      const exists = prev.find(item => String(item.id) === String(product.id));
      if (exists) {
        return prev.filter(item => String(item.id) !== String(product.id));
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
    updateCounterCart,
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
  return context as CartFavoriteContextType;
};
