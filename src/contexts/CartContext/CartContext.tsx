import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';

export type CartItem = {
  cartItemId: string;
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (cartItemId: string) => void;
  increaseQty: (cartItemId: string) => void;
  decreaseQty: (cartItemId: string) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalAmount: number;
  createCartItemId: (product: Product) => string;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const createCartItemId = (product: Product) => {
  return `${product.itemId}`;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const cartItemId = createCartItemId(product);

    setCart(prev => {
      const existingItem = prev.find(item => item.cartItemId === cartItemId);

      if (existingItem) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { cartItemId, product, quantity: 1 }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const increaseQty = (cartItemId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (cartItemId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalQuantity,
        totalAmount,
        createCartItemId,
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
