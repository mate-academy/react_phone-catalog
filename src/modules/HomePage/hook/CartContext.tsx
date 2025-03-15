import React, { createContext, useContext, useMemo, useState } from 'react';
import { Product } from '../../../type/Product';

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  totalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    if (cart.includes(product)) {
      return;
    }

    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = () => {
    return cart.reduce((acc, product) => {
      return acc + product.priceDiscount;
    }, 0);
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      totalPrice,
    }),
    [cart, addToCart, removeFromCart, totalPrice ],
  );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  return context;
};
