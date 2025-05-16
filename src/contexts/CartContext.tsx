import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  id: number | string;
  quantity: number;
  product: Product;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number | string) => void;
  updateCartItemQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');

    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);

      if (existing) {
        return prev;
      }

      return [...prev, { id: product.id, quantity: 1, product }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItemQuantity = (id: number | string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

export default CartContext;
