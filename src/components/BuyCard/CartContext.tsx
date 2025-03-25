import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { ProductDetails } from '../../types/ProductTypes';

interface CartContextProps {
  cart: ProductDetails[];
  toggleCart: (product: ProductDetails) => void;
  removeFromCart: (productId: string) => void;
  getQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<ProductDetails[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleCart = (product: ProductDetails) => {
    const isInCart = cart.some(item => item.id === product.id);

    if (isInCart) {
      setCart(prev => prev.filter(item => item.id !== product.id));
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getQuantity = (productId: string) => {
    const product = cart.find(item => item.id === productId);

    return product?.quantity || 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, toggleCart, removeFromCart, getQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
