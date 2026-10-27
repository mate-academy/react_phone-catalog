import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Product } from '../types/Product';
import type { CartItem } from '../types/CartItem';

type ShopContextType = {
  cart: CartItem[];
  favorites: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, delta: number) => void;
  clearCart: () => void;

  toggleFavorite: (product: Product) => void;

  isInCart: (id: string) => boolean;
  isFavorite: (id: string) => boolean;

  cartQuantity: number;
  cartTotal: number;
};

type Props = {
  children: ReactNode;
};

const ShopContext = createContext<ShopContextType | null>(null);

const getSavedData = <T,>(key: string, fallback: T): T => {
  try {
    const savedData = localStorage.getItem(key);

    return savedData ? (JSON.parse(savedData) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>(() =>
    getSavedData('phone-catalog-cart', []),
  );

  const [favorites, setFavorites] = useState<Product[]>(() =>
    getSavedData('phone-catalog-favorites', []),
  );

  useEffect(() => {
    localStorage.setItem('phone-catalog-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('phone-catalog-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = useCallback((product: Product) => {
    setCart(items => {
      const alreadyAdded = items.some(item => item.id === product.itemId);

      if (alreadyAdded) {
        return items;
      }

      return [
        ...items,
        {
          id: product.itemId,
          quantity: 1,
          product,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(items => items.filter(item => item.id !== id));
  }, []);

  const changeQuantity = useCallback((id: string, delta: number) => {
    setCart(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites(items => {
      const alreadyFavorite = items.some(
        item => item.itemId === product.itemId,
      );

      if (alreadyFavorite) {
        return items.filter(item => item.itemId !== product.itemId);
      }

      return [...items, product];
    });
  }, []);

  const isInCart = useCallback(
    (id: string) => cart.some(item => item.id === id),
    [cart],
  );

  const isFavorite = useCallback(
    (id: string) => favorites.some(item => item.itemId === id),
    [favorites],
  );

  const cartQuantity = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      favorites,

      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,

      toggleFavorite,

      isInCart,
      isFavorite,

      cartQuantity,
      cartTotal,
    }),
    [
      cart,
      favorites,
      addToCart,
      removeFromCart,
      changeQuantity,
      clearCart,
      toggleFavorite,
      isInCart,
      isFavorite,
      cartQuantity,
      cartTotal,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }

  return context;
};
