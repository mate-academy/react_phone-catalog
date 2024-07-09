import React from 'react';
import { useLocaleStorage } from '../utils/hooks/useLocalStorage';

type Props = {
  children: React.ReactNode;
};

type CartType = {
  id: number;
  quantity: number;
  name?: string;
  image?: string;
  price?: number;
  category?: string;
  itemId?: string;
};

type ShoppingCartContext = {
  getItemsQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  setCartItems: (v: CartType[] | ((s: CartType[]) => CartType[])) => void;
  cartItems: CartType[];
};

export const ShoppingCartContext = React.createContext(
  {} as ShoppingCartContext,
);

export const ShoppingCartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocaleStorage<CartType[]>('cart', []);

  const getItemsQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    
    setCartItems(currentItems => {
      if (!currentItems.find(item => item.id === id)) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id);
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        setCartItems,
        cartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
