import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

interface StoreContextType {
  cart: CartItem[];
  favorites: Product[];
  totalCartQuantity: number;
  totalCartPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, amount: number) => void;
  clearCart: () => void;
  toggleFavorite: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

function readStorage<T>(key: string): T[] {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage('cart'));
  const [favorites, setFavorites] = useState<Product[]>(() =>
    readStorage('favorites'),
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const addToCart = (product: Product) => {
    setCart(prev =>
      prev.some(item => item.product.itemId === product.itemId)
        ? prev
        : [...prev, { id: product.id, quantity: 1, product }],
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.product.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, amount: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev =>
      prev.some(item => item.itemId === product.itemId)
        ? prev.filter(item => item.itemId !== product.itemId)
        : [...prev, product],
    );
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        totalCartQuantity,
        totalCartPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
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
