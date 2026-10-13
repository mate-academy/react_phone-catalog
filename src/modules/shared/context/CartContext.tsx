import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { CartItem, Product } from '../types/Product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  totalAmount: number;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'phone-catalog-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.itemId);

      if (exists) {
        return prev;
      }

      return [...prev, { id: product.itemId, quantity: 1, product }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      return;
    }

    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isInCart = useCallback(
    (itemId: string) => cartItems.some(item => item.id === itemId),
    [cartItems],
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      totalAmount,
      totalQuantity,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      totalAmount,
      totalQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
