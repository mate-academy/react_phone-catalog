import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';

type ShopContextType = {
  favorites: Product[];
  cart: CartItem[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

type ShopProviderProps = {
  children: ReactNode;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const FAVORITES_STORAGE_KEY = 'favorites';
const CART_STORAGE_KEY = 'cart';

export const ShopContext = createContext<ShopContextType | undefined>(
  undefined,
);

export const useShop = () => {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error('useShop must be used inside ShopProvider');
  }

  return context;
};

const getStoredData = <T,>(key: string, fallback: T): T => {
  const savedData = localStorage.getItem(key);

  if (!savedData) {
    return fallback;
  }

  try {
    return JSON.parse(savedData) as T;
  } catch {
    return fallback;
  }
};

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>(() =>
    getStoredData<Product[]>(FAVORITES_STORAGE_KEY, []),
  );

  const [cart, setCart] = useState<CartItem[]>(() =>
    getStoredData<CartItem[]>(CART_STORAGE_KEY, []),
  );

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      const alreadyExists = prevFavorites.some(item => item.id === product.id);

      if (alreadyExists) {
        return prevFavorites;
      }

      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(product => product.id !== id),
    );
  };

  const isFavorite = (id: number) =>
    favorites.some(product => product.id === id);

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== id));
  };

  const isInCart = (id: number) => cart.some(item => item.product.id === id);

  const addToCart = (item: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.product.id === item.id,
      );

      if (existingItem) {
        return prevCart.map(cartItem => {
          if (cartItem.product.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }

          return cartItem;
        });
      }

      return [...prevCart, { product: item, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const increaseQuantity = (id: number) => {
    setCart(prevCart =>
      prevCart.map(cartItem => {
        if (cartItem.product.id === id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }

        return cartItem;
      }),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(prevCart => {
      const currentItem = prevCart.find(cartItem => cartItem.product.id === id);

      if (!currentItem) {
        return prevCart;
      }

      if (currentItem.quantity === 1) {
        return prevCart.filter(cartItem => cartItem.product.id !== id);
      }

      return prevCart.map(cartItem => {
        if (cartItem.product.id === id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          };
        }

        return cartItem;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        addToCart,
        removeFromCart,
        isInCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
