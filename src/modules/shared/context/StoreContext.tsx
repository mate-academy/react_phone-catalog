import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType, Product } from '../types/Product';

interface StoreContextType {
  favorites: Product[];
  cart: CartItemType[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (itemId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  totalCartCount: number;
  totalCartPrice: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const FAVORITES_KEY = 'nice_gadgets_favorites';
const CART_KEY = 'nice_gadgets_cart';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItemType[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.itemId === product.itemId);

      if (exists) {
        return prev.filter((item) => item.itemId !== product.itemId);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (itemId: string) =>
    favorites.some((item) => item.itemId === itemId);

  const isInCart = (itemId: string) => cart.some((item) => item.id === itemId);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === product.itemId)) {
        return prev;
      }
      return [...prev, { id: product.itemId, quantity: 1, product }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : item;
      }),
    );
  };

  const clearCart = () => setCart([]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isInCart,
        isFavorite,
        totalCartPrice,
        totalCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
