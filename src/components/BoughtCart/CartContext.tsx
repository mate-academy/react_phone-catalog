import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from '../../types/ProductTypes';

interface CartContextProps {
  cart: Product[];
  toggleCart: (product: Product) => void;
  removeFromCart: (product: string) => void;
  getQuantity: (product: string) => number;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
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
    const isInCart = cart.some(c => c.id === product.id);

    if (isInCart) {
      setCart(prev => prev.filter(c => c.id !== product.id));
    } else {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev => {
      const updatedCart = prev.map((item: Product) =>
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
    const product = cart.find(p => String(p.id) === productId);

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
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error('useFavourites has to be used within a FavouritesProvider');
  }

  return {
    ...context,
  };
};
