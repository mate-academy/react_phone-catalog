import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ReactNode } from 'react';
import { CartItem, Product } from '../api/types';

const CART_STORAGE_KEY = 'phone-cart';
const FAVORITES_STORAGE_KEY = 'phone-favorites';

interface ShopContextValue {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);

    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(CART_STORAGE_KEY, []),
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    readStorage<string[]>(FAVORITES_STORAGE_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      favorites,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      isInCart: (productId: string) =>
        cart.some(item => item.product.id === productId),
      isFavorite: (productId: string) => favorites.includes(productId),
      addToCart: (product: Product) => {
        setCart(prev => {
          const existing = prev.find(item => item.product.id === product.id);

          if (existing) {
            return prev;
          }

          return [...prev, { id: product.id, quantity: 1, product }];
        });
      },
      removeFromCart: (productId: string) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
      },
      updateQuantity: (productId: string, quantity: number) => {
        const nextQuantity = Math.max(1, quantity);

        setCart(prev =>
          prev.map(item =>
            item.product.id === productId
              ? { ...item, quantity: nextQuantity }
              : item,
          ),
        );
      },
      clearCart: () => setCart([]),
      toggleFavorite: (productId: string) => {
        setFavorites(prev =>
          prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId],
        );
      },
    }),
    [cart, favorites],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = (): ShopContextValue => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }

  return context;
};
