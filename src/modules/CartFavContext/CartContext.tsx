import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItem } from '@/types/CartItem';

const CART_KEY = 'shop_cart';
const FAV_KEY = 'shop_favorites';

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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const storedFav = localStorage.getItem(FAV_KEY);
      return storedFav ? JSON.parse(storedFav) : [];
    } catch (error) {
      return [];
    }
  });

  const totalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const totalFavoritesCount = useMemo(() => {
    return favorites.length;
  }, [favorites]);
  // Load from localStorage once

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.itemId === itemId);
      if (existing) {
        return prev.map(item => item);
      }
      return [...prev, { itemId, quantity: 1 }];
    });
  };
  const increaseQuantity = (itemId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const reduceQuantity = (itemId: string) => {
    setCart(prev =>
      prev
        .map(item =>
          item.itemId === itemId
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.itemId !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToFavorites = (productId: string) => {
    setFavorites(prev => [...prev, productId]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const isInCart = (productId: string) =>
    cart.some(item => item.itemId === productId);

  const isFavorite = (productId: string) =>
    favorites.some(id => id === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        totalCount,
        totalFavoritesCount,
        addToCart,
        removeFromCart,
        clearCart,
        addToFavorites,
        removeFromFavorites,
        isInCart,
        isFavorite,
        reduceQuantity,
        increaseQuantity,
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
