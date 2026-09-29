import React, { createContext, useContext, useMemo } from 'react';
import { CartItem, Product } from '../types/product.types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ShopContextValue {
  favourites: Product[];
  cartItems: CartItem[];
  favouriteIds: Set<string>;
  cartIds: Set<string>;
  toggleFavourite: (product: Product) => void;
  addToCart: (product: Product) => void;
  setCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartQuantity: number;
}

const ShopContext = createContext<ShopContextValue | null>(null);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useLocalStorage<Product[]>(
    'favourites',
    [],
  );
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const toggleFavourite = (product: Product) => {
    setFavourites(prev =>
      prev.some(item => item.itemId === product.itemId)
        ? prev.filter(item => item.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  const addToCart = (product: Product) => {
    setCartItems(prev =>
      prev.some(item => item.product.itemId === product.itemId)
        ? prev
        : [...prev, { product, quantity: 1 }],
    );
  };

  const setCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.product.itemId !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const favouriteIds = useMemo(
    () => new Set(favourites.map(item => item.itemId)),
    [favourites],
  );

  const cartIds = useMemo(
    () => new Set(cartItems.map(item => item.product.itemId)),
    [cartItems],
  );

  const cartQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const value: ShopContextValue = {
    favourites,
    cartItems,
    favouriteIds,
    cartIds,
    toggleFavourite,
    addToCart,
    setCartQuantity,
    removeFromCart,
    clearCart,
    cartQuantity,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }

  return context;
}
