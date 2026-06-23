import React, { createContext, useEffect, useState } from 'react';
import { CartItem } from '../types/Cart';
import { Product } from '../types/Product';

type CartContentType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
};

export const CartContext = createContext<CartContentType | undefined>(
  undefined,
);

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
    setCart(prev => {
      const isAlreadyInCart = prev.some(item => item.product.id === product.id);

      if (isAlreadyInCart) {
        return prev;
      }

      return [
        ...prev,
        {
          id: product.id,
          quantity: 1,
          product,
        },
      ];
    });
  };

  const changeQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (cartItemId: number) => {
    return cart.some(item => item.product.id === cartItemId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
