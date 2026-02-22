import React, { useMemo, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { useLocalStorage } from '../utils/useLocalStorage';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isInCart: () => false,
  totalItems: 0,
  totalPrice: 0,
});

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems((prev: CartItem[]) => {
        if (prev.some(item => item.id === product.id)) {
          return prev;
        }

        return [...prev, { id: product.id, quantity: 1, product }];
      });
    },
    [setCartItems],
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setCartItems((prev: CartItem[]) =>
        prev.filter(item => item.id !== productId),
      );
    },
    [setCartItems],
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      setCartItems((prev: CartItem[]) =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [setCartItems],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const isInCart = useCallback(
    (productId: number) => {
      return cartItems.some(item => item.id === productId);
    },
    [cartItems],
  );

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
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
      totalItems,
      totalPrice,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      totalItems,
      totalPrice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
