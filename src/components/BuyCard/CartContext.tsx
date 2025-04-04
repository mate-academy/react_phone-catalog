import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '../../types/ProductTypes';
interface CartContextProps {
  cart: Product[];
  toggleCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getQuantity: (productId: string) => number;
  clearCart: () => void;
  updateQuantify: (productId: string, quantity: number) => void;
}
const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const toggleCart = (product: Product) => {
    const isInCart = cart.some(item => item.id === product.id);

    if (isInCart) {
      setCart(prev => {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity ?? 0) + 1 }
            : item,
        );
      });
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantify = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map((item: Product) =>
        String(item.id) === productId ? { ...item, quantity } : item,
      );

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => String(item.id) !== productId));
  };

  const getQuantity = (productId: string) => {
    const product = cart.find(item => String(item.id) === productId);

    return product?.quantity || 0;
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCart,
        removeFromCart,
        getQuantity,
        clearCart,
        updateQuantify,
      }}
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

  return {
    ...context,
  };
};
