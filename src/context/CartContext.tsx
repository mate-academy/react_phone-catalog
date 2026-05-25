import React, { createContext, useMemo, useState } from 'react';
import { ProductCart } from '../types/ProductCart';

interface CartContextType {
  cartItems: ProductCart[];
  setCartItems: React.Dispatch<React.SetStateAction<ProductCart[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);

  const value = useMemo(
    () => ({ cartItems, setCartItems }),
    [cartItems, setCartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
