import React, { createContext, ReactNode, useContext } from 'react';
import { Product } from '@/types/product';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  isCart: (productId: string) => boolean;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);

  const incrementQuantity = (productId: string) => {
    setCart(
      cart.map(item =>
        item.itemId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.itemId === product.itemId);

    if (existingItem) {
      incrementQuantity(product.itemId);
    } else {
      const cartItem: CartItem = { ...product, quantity: 1 };

      setCart([...cart, cartItem]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.itemId !== productId));
  };

  const decrementQuantity = (productId: string) => {
    const existingItem = cart.find(item => item.itemId === productId);

    if (existingItem && existingItem.quantity === 1) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map(item =>
          item.itemId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  };

  const isCart = (productId: string) => {
    return cart.some(item => item.itemId === productId);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    isCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
