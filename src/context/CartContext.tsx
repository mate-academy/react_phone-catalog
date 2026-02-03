import React, { createContext, useContext, useEffect, useState } from 'react';
import { Phone } from '../types/Phone';
import { CartItem, CartContextType } from '../types/Cart';

export type { CartItem, CartContextType };

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem('cart');
      }
    }
  }, []);

  const saveToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const addToCart = (phone: Phone) => {
    setCartItems(currentItems => {
      const alreadyInCart = currentItems.find(
        item => item.phone.id === phone.id,
      );

      if (alreadyInCart) {
        return currentItems;
      }

      const newItems = [...currentItems, { phone, quantity: 1 }];

      saveToLocalStorage(newItems);

      return newItems;
    });
  };

  const removeFromCart = (phoneId: string) => {
    setCartItems(currentItems => {
      const newItems = currentItems.filter(item => item.phone.id !== phoneId);

      saveToLocalStorage(newItems);

      return newItems;
    });
  };

  const increaseQuantity = (phoneId: string) => {
    setCartItems(currentItems => {
      const newItems = currentItems.map(item => {
        if (item.phone.id !== phoneId) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });

      saveToLocalStorage(newItems);

      return newItems;
    });
  };

  const decreaseQuantity = (phoneId: string) => {
    setCartItems(currentItems => {
      const newItems = currentItems.map(item => {
        if (item.phone.id !== phoneId) {
          return item;
        }

        if (item.quantity <= 1) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      });

      saveToLocalStorage(newItems);

      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart error: CartContext is undefined');
  }

  return context;
};
