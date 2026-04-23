import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './types/product';

interface CartContextType {
  cartItems: CartItemType[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
}

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface FavoritesContextType {
  favoritesItems: Product[];
  setFavoritesItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a ItemsProvider');
  }

  return context;
};

export const useFavorites = () => {
  const context = React.useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a ItemsProvider');
  }

  return context;
};

export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem('cartItems');

    return saved ? JSON.parse(saved) : [];
  });

  const [favoritesItems, setFavoritesItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('favoritesItems');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('favoritesItems', JSON.stringify(favoritesItems));
  }, [favoritesItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <FavoritesContext.Provider value={{ favoritesItems, setFavoritesItems }}>
        {children}
      </FavoritesContext.Provider>
    </CartContext.Provider>
  );
};
