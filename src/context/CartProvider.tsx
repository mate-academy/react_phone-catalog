import React from 'react';
import { CartItemType } from '../types/CartItemType';
import UseLocalStorage from '../hooks/UseLocalStorage';

type CartContextType = {
  getItemQuantity: (id: string) => number;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  cart: CartItemType[];
};

export const CartContext = React.createContext({} as CartContextType);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = UseLocalStorage<CartItemType[]>('cart', []);

  const getItemQuantity = (id: string) => {
    return cart.find((item: CartItemType) => item.id === id)?.quantity || 0;
  };

  const increaseQuantity = (id: string) => {
    setCart((prev: CartItemType[]) => {
      if (!prev.find(item => item.id === id)) {
        return [...prev, { id, quantity: 1 }];
      }

      return prev.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });
    });
  };

  const decreaseQuantity = (id: string) => {
    setCart((prev: CartItemType[]) => {
      return prev.map(item => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev: CartItemType[]) => {
      return prev.filter(item => item.id !== id);
    });
  };

  return (
    <CartContext.Provider value={{
      getItemQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      cart,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
