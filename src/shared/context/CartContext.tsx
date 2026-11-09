import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';

type CartContextType = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

// eslint-disable-next-line max-len
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load from localStorage once
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');

    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Derived values
  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
    [items],
  );

  // Actions
  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const increase = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id: string) => {
    setItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => setItems([]);

  // to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      items,
      totalCount,
      totalPrice,
      addToCart,
      removeFromCart,
      increase,
      decrease,
      clearCart,
    }),
    [items, totalCount, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
};
