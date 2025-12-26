import React, { useEffect, useState } from 'react';
import { CartItem, Product } from '../types/types';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | undefined) => void;
  updateCartItemQuantity: (productId: string | undefined, quantity: number) => void;
  clearCart: () => void;
  cartTotalItemsCount: number;
};

type CartProviderProps = {
  children: React.ReactNode;
};

export const STORAGE_KEY = 'cartItems';

export const CartContext = React.createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  cartTotalItemsCount: 0,
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);

      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error parsing cart data:', error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product?.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.product?.id === product.id ? { ...item, amount: item.amount + 1 } : item,
        );
      }

      return [...prev, { product, amount: 1 }];
    });
  };

  const removeFromCart = (productId: string | undefined) => {
    setCartItems(prev => prev.filter(item => item.product?.itemId !== productId));
  };

  const updateCartItemQuantity = (productId: string | undefined, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.product?.itemId === productId ? { ...item, amount: quantity } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const cartTotalItemsCount = cartItems.reduce((total, item) => total + item.amount, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        cartTotalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
