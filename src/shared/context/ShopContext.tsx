import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { CartItem, Product } from '../types';
import { readStorage, writeStorage } from '../storage';

type ShopContextValue = {
  cart: CartItem[];
  favorites: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isInCart: (id: string) => boolean;
  cartQuantity: number;
  cartTotal: number;
};

const ShopContext = createContext<ShopContextValue | null>(null);

type Props = {
  children: ReactNode;
};

function readCart(): CartItem[] {
  const saved = readStorage<unknown>('catalog-cart', []);

  if (!Array.isArray(saved)) {
    return [];
  }

  return saved;
}

function readFavorites(): string[] {
  const saved = readStorage<unknown>('catalog-favorites', []);

  if (!Array.isArray(saved)) {
    return [];
  }

  return saved.filter(item => typeof item === 'string');
}

export function ShopProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [favorites, setFavorites] = useState<string[]>(readFavorites);

  useEffect(() => {
    writeStorage('catalog-cart', cart);
  }, [cart]);

  useEffect(() => {
    writeStorage('catalog-favorites', favorites);
  }, [favorites]);

  const addToCart = (product: Product) => {
    setCart(current => {
      const exists = current.some(item => item.id === product.id);

      if (exists) {
        return current;
      }

      const newItem: CartItem = {
        id: product.id,
        quantity: 1,
        product,
      };

      return [...current, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCart(current =>
      current.map(item => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart(current =>
      current.map(item => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(current => {
      if (current.includes(id)) {
        return current.filter(item => item !== id);
      }

      return [...current, id];
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const isInCart = (id: string) => cart.some(item => item.id === id);

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.priceRegular * item.quantity,
    0,
  );

  const value: ShopContextValue = {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    toggleFavorite,
    isFavorite,
    isInCart,
    cartQuantity,
    cartTotal,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return context;
}
