import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.map(item => ({
        id: item.id ?? item.product.id,
        product: item.product,
        quantity: item.quantity,
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const alreadyExists = prevCart.some(
        item => item.product.id === product.id,
      );

      if (alreadyExists) {
        return prevCart;
      }

      return [
        ...prevCart,
        {
          id: product.id,
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const changeQuantity = (productId: number, delta: number) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.product.id !== productId) {
            return item;
          }

          const newQuantity = item.quantity + delta;

          if (newQuantity <= 0) {
            return null;
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
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
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
