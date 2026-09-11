import { createContext, useEffect, useState } from 'react';

import { type Product } from '../types';

type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
};

type Props = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addProduct = (product: Product) => {
    if (cartItems.some(item => item.id === product.id)) {
      return;
    }

    setCartItems([
      ...cartItems,
      {
        id: product.id,
        quantity: 1,
        product,
      },
    ]);
  };

  const removeProduct = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
};
