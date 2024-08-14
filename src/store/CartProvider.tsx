import React, { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Product } from '../types/Product';

type CartType = {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  getActiveButton: (product: Product) => boolean;
  handleAddButton: (product: Product) => void;
};

export const CartContext = createContext<CartType>({
  cart: [],
  setCart: () => {},
  getActiveButton: () => false,
  handleAddButton: () => {},
});

type Props = {
  children: ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', []);

  const getActiveButton = (product: Product) => {
    return cart.some((item: Product) => product.id === item.id);
  };

  const handleAddButton = (product: Product) => {
    if (getActiveButton(product)) {
      setCart(cart.filter((item: Product) => item.id !== product.id));
    } else {
      const newProduct = { ...product, inCart: 1 };

      setCart([...cart, newProduct]);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, getActiveButton, handleAddButton }}
    >
      {children}
    </CartContext.Provider>
  );
};
