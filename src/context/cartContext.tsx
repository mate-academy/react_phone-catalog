import { log } from 'console';
import React, { createContext, useContext, useState } from 'react';

type CartContextType = {
  cart: string[];
  toggleCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<string[]>([]);

  const toggleCart = (id: string) => {
    setCart(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id],
    );
  };

  console.log(cart);

  return (
    <CartContext.Provider value={{ cart, toggleCart }}>
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
