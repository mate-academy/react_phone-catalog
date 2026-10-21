import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Product } from '../types/Product';
import {
  getCurrentPrice,
  getProductId,
  normalizeProduct,
} from '../utils/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalPrice: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const readCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    const normalized = normalizeProduct(product);
    const productId = getProductId(normalized);

    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => getProductId(item.product) === productId,
      );

      if (existingItem) {
        return prevCart.map(item =>
          getProductId(item.product) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { product: normalized, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart =>
      prevCart.filter(item => getProductId(item.product) !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart =>
        prevCart.filter(item => getProductId(item.product) !== productId),
      );

      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        getProductId(item.product) === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInCart = useCallback(
    (productId: string) =>
      cart.some(item => getProductId(item.product) === productId),
    [cart],
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + getCurrentPrice(item.product) * item.quantity,
    0,
  );
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      totalPrice,
      totalCount,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      totalPrice,
      totalCount,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
