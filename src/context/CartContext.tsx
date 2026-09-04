/* eslint-disable prettier/prettier */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  totalQuantity: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = 'cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const exists = prev.some(
        (item) => item.product.itemId === product.itemId,
      );

      if (exists) {
        return prev;
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.product.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.itemId === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (itemId: string) =>
    items.some((item) => item.product.itemId === itemId);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
