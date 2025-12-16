import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Product } from '../../../types/Product';

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

type CartContextValue = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;

  addToCart: (id: string, product: Product) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'cart';

function isValidCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  if (typeof item.id !== 'string') {
    return false;
  }

  if (typeof item.quantity !== 'number') {
    return false;
  }

  if (typeof item.product !== 'object' || item.product === null) {
    return false;
  }

  const product = item.product as Record<string, unknown>;

  return (
    typeof product.name === 'string' &&
    typeof product.price === 'number' &&
    typeof product.fullPrice === 'number' &&
    typeof product.image === 'string' &&
    typeof product.screen === 'string' &&
    typeof product.capacity === 'string' &&
    typeof product.ram === 'string'
  );
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: string, product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);

      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...prev, { id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const increase = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id: string) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  );

  const value: CartContextValue = {
    cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    increase,
    decrease,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
