import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  initializeCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  reduceQuantity,
  clearCart,
} from '@/store/slices/cartSlice';
import {
  initializeFavorites,
  addToFavorites,
  removeFromFavorites,
} from '@/store/slices/favoritesSlice';
import type { CartItem } from '@/types/CartItem';

type CartContextType = {
  cart: CartItem[];
  favorites: string[];
  addToCart: (itemId: string) => void;
  removeFromCart: (productId: string) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  reduceQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalFavoritesCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

/**
 * CartProvider wrapper that reads from Redux store instead of managing its own state.
 * This enables gradual migration: components keep using useCart() unchanged,
 * but state now comes from Redux.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  const favorites = useAppSelector(state => state.favorites.ids);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shop_cart');

      if (storedCart) {
        const parsed = JSON.parse(storedCart);

        dispatch(initializeCart(parsed));
      }
    } catch (error) {
      console.error('Failed to restore cart from localStorage:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      const storedFav = localStorage.getItem('shop_favorites');

      if (storedFav) {
        const parsed = JSON.parse(storedFav);

        dispatch(initializeFavorites(parsed));
      }
    } catch (error) {
      console.error('Failed to restore favorites from localStorage:', error);
    }
  }, [dispatch]);

  const totalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalFavoritesCount = useMemo(() => {
    return favorites.length;
  }, [favorites]);

  const contextValue: CartContextType = useMemo(
    () => ({
      cart,
      favorites,
      totalCount,
      totalFavoritesCount,
      addToCart: (itemId: string) => {
        dispatch(addToCart(itemId));
      },
      removeFromCart: (itemId: string) => {
        dispatch(removeFromCart(itemId));
      },
      addToFavorites: (productId: string) => {
        dispatch(addToFavorites(productId));
      },
      removeFromFavorites: (productId: string) => {
        dispatch(removeFromFavorites(productId));
      },
      isInCart: (productId: string) =>
        cart.some(item => item.itemId === productId),
      isFavorite: (productId: string) => favorites.some(id => id === productId),
      increaseQuantity: (itemId: string) => {
        dispatch(increaseQuantity(itemId));
      },
      reduceQuantity: (itemId: string) => {
        dispatch(reduceQuantity(itemId));
      },
      clearCart: () => {
        dispatch(clearCart());
      },
    }),
    [cart, favorites, totalCount, totalFavoritesCount, dispatch],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be inside <CartProvider>');
  }

  return ctx;
};
