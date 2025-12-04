import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types/Product';

const CART_KEY = 'shop_cart';
const FAV_KEY = 'shop_favorites';

type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isInCart: (productId: number) => boolean;
  isFavorite: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load from localStorage once
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    const storedFav = localStorage.getItem(FAV_KEY);

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFav) setFavorites(JSON.parse(storedFav));
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prev => [...prev, product]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.itemId !== productId));
  };


  const isInCart = (productId: number) =>
    cart.some(item => item.id === productId);
  const isFavorite = (productId: string) =>
    favorites.some(item => item.itemId === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        addToFavorites,
        removeFromFavorites,
        isInCart,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be inside <CartProvider>');
  }
  return ctx;
};
