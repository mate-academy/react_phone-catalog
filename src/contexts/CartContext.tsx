import React, { createContext, useContext, useState, useEffect } from 'react';
import { Phone } from '../types/Phone';
import { Tablet } from '../types/Tablet';
import { Accessory } from '../types/Accessory';

type Product = Phone | Tablet | Accessory;

type CartContextType = {
  cartItems: Product[];
  cartItemsIds: string[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setCartItemsIds: React.Dispatch<React.SetStateAction<string[]>>;
  totalAmount: number;
  totalQuantity: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartItemsIds, setCartItemsIds] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');

    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setCartItemsIds(cartItems.map(item => item.id));
  }, [cartItems]);

  useEffect(() => {
    let quantity = 0;
    let sum = 0;

    for (const item of cartItems) {
      quantity += item.quantity;

      if (item.quantity === 1) {
        sum += item.priceDiscount;
      } else {
        sum += item.priceDiscount * item.quantity;
      }
    }

    setTotalQuantity(quantity);
    setTotalAmount(sum);
  }, [cartItems]);

  return (
    // eslint-disable-next-line max-len
    <CartContext.Provider
      value={{ cartItems, setCartItems, cartItemsIds, setCartItemsIds, totalAmount, totalQuantity }}
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
