import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';
type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  toggleCart: (product: Product) => void;
  isInCart: (itemId: string) => boolean;
  updateQuantity: (itemId: string, quantity: number) => void;
  totalCount: number;
  totalPrice: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cart');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const clearCart = () => setCart([]);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.itemId === product.itemId);

      if (exist) {
        return prev.map(item =>
          item.product.itemId === product.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const toggleCart = (product: Product) => {
    setCart(prev => {
      const exist = prev.find(item => item.product.itemId === product.itemId);

      if (exist) {
        return prev.filter(item => item.product.itemId !== product.itemId);
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.product.itemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.itemId === itemId ? { ...item, quantity } : item,
      ),
    );
  };

  const isInCart = (itemId: string) => {
    return cart.some(item => item.product.itemId === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        clearCart,
        updateQuantity,
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        totalCount,
        totalPrice,
        toggleCart,
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
