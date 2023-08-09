import React, { FC, ReactNode } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CartItem } from '../types/CartItem';
import { Action } from '../types/Action';

type CartContextProps = {
  cartItems: CartItem[],
  addToCart: (product: Product) => void,
  removeFromCart: (productId: string) => void,
  changeQuantity: (productId: string, action: Action) => void,
};

export const CartContext = React.createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  changeQuantity: () => {},
});

type Props = {
  children: ReactNode,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const addToCart = (product: Product) => {
    const newItem = { id: product.id, product, quantity: 1 };

    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (productId: string) => {
    setCartItems([...cartItems].filter(item => item.id !== productId));
  };

  const changeQuantity = (
    productId: string,
    action: Action,
  ) => {
    const updatedCartItems = [...cartItems].map((item) => {
      if (productId === item.id) {
        switch (action) {
          case (Action.Add):
            return { ...item, quantity: item.quantity + 1 };
          case (Action.Remove):
            return { ...item, quantity: item.quantity - 1 };
          default:
            throw new Error('Unable to change quantity of products.');
        }
      }

      return item;
    });

    setCartItems(updatedCartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
