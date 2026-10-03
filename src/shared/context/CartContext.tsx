import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  totalCount: number;
  totalAmount: number;
}

const CART_STORAGE_KEY = 'cart_items';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const isInCart = useCallback(
    (itemId: string) => {
      return cartItems.some(
        item => item.id === itemId || item.product.itemId === itemId,
      );
    },
    [cartItems],
  );

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      if (
        prev.some(
          item =>
            item.id === product.itemId ||
            item.product.itemId === product.itemId,
        )
      ) {
        return prev;
      }

      return [...prev, { id: product.itemId, quantity: 1, product }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev =>
      prev.filter(item => item.id !== itemId && item.product.itemId !== itemId),
    );
  }, []);

  const increaseQuantity = useCallback((itemId: string) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === itemId || item.product.itemId === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      }),
    );
  }, []);

  const decreaseQuantity = useCallback((itemId: string) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === itemId || item.product.itemId === itemId) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }

        return item;
      }),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isInCart,
      totalCount,
      totalAmount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isInCart,
      totalCount,
      totalAmount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
