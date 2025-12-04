import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCart, setCart } from '../api/localCart';

export type CartItem = {
  id: number;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCartState] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await getCart();

      setCart(storedCart);
    };

    loadCart();
  }, []);

  const sync = (updated: CartItem[]) => {
    setCartState(updated);
    setCart(updated);
  };

  const addToCart = (id: number) => {
    const exists = cart.find(item => item.id === id);

    if (exists) {
      sync(
        cart.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        ),
      );
    } else {
      sync([...cart, { id, qty: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    sync(cart.filter(item => item.id !== id));
  };

  const increase = (id: number) => {
    sync(
      cart.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decrease = (id: number) => {
    const updated = cart
      .map(item => (item.id === id ? { ...item, qty: item.qty - 1 } : item))

      .filter(item => item.qty > 0);

    sync(updated);
  };

  const clearCart = () => {
    sync([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increase, decrease, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Cart Context Error');
  }

  return context;
};
