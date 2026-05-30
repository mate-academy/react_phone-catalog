import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { CartItem, Product } from '../types';

const CART_KEY = 'phone-catalog-cart';
const FAVORITES_KEY = 'phone-catalog-favorites';

export type AppContextType = {
  cartItems: CartItem[];
  favorites: string[];
  cartQuantity: number;
  totalAmount: number;
  favoritesCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  changeItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

export const AppContext = createContext<AppContextType | null>(null);

const parseStorage = <T,>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    parseStorage(CART_KEY, []),
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    parseStorage(FAVORITES_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const cartQuantity = useMemo(
    () => cartItems.reduce((amount, item) => amount + item.quantity, 0),
    [cartItems],
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.priceDiscount,
        0,
      ),
    [cartItems],
  );

  const addToCart = (product: Product) => {
    setCartItems(current => {
      if (current.some(item => item.product.id === product.id)) {
        return current;
      }

      return [...current, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(current =>
      current.filter(item => item.product.id !== productId),
    );
  };

  const changeItemQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);

      return;
    }

    setCartItems(current =>
      current.map(item => {
        if (item.product.id !== productId) {
          return item;
        }

        return { ...item, quantity };
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId],
    );
  };

  const isInCart = (productId: string) =>
    cartItems.some(item => item.product.id === productId);
  const isFavorite = (productId: string) => favorites.includes(productId);

  const contextValue: AppContextType = {
    cartItems,
    favorites,
    cartQuantity,
    totalAmount,
    favoritesCount: favorites.length,
    addToCart,
    removeFromCart,
    changeItemQuantity,
    clearCart,
    isInCart,
    toggleFavorite,
    isFavorite,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
