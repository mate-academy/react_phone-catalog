import React, { createContext, useState, useEffect } from 'react';
import { Device } from '../types/Device';
import { Products } from '../types//products';

type CartItem = Products | Device;

interface CartContexType {
  cartItems: CartItem[];
  increaseToCart: (item: CartItem) => void;
  decreaseFromCart: (item: CartItem) => void;
  deleteItems: (item: CartItem) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

type Props = {
  children: React.ReactNode;
};

export const CartContext = createContext({} as CartContexType);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') as string)
      : [],
  );

  const increaseToCart = (item: CartItem) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const decreaseFromCart = (item: CartItem) => {
    const isItemInCart = cartItems.find(cartItem => cartItem.id === item.id);

    if (isItemInCart?.quantity === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        ),
      );
    }
  };

  const deleteItems = (item: CartItem) => {
    const deleteCartItems = cartItems.filter(cartItem => {
      return cartItem.id !== item.id;
    });

    setCartItems(deleteCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = 'price' in item ? item.price : item.priceDiscount;

      return total + itemPrice * item.quantity;
    }, 0);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const cartItems = localStorage.getItem('cartItems');

    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        increaseToCart,
        decreaseFromCart,
        clearCart,
        getCartTotal,
        deleteItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
