import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { CartItem } from '../types';

const CART_STORAGE_KEY = 'cart';

interface CartContextType {
  cartItems: CartItem[];
  isInCart: (productId: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  totalAmount: number;
  totalQuantity: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  isInCart: () => false,
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  totalAmount: 0,
  totalQuantity: 0,
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const isInCart = (productId: number) =>
    cartItems.some(item => item.product.id === productId);

  const addToCart = (product: Product) => {
    if (isInCart(product.id)) {
      return;
    }

    setCartItems(prev => [...prev, { product, quantity: 1 }]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0,
  );

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isInCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalAmount,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
