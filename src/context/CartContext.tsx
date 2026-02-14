import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  changeQuantity: (itemId: string, amount: number) => void;
  clearCart: () => void;
  cartTotalItemsCount: number;
  cartTotalPrice: number;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  changeQuantity: () => {},
  clearCart: () => {},
  cartTotalItemsCount: 0,
  cartTotalPrice: 0,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem('cart') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.product?.itemId === product.itemId,
      );

      if (existing) {
        return prev;
      }

      return [...prev, { product, amount: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.product?.itemId !== itemId));
  };

  const changeQuantity = (itemId: string, amount: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product?.itemId === itemId
          ? { ...item, amount: Math.max(1, amount) }
          : item,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartTotalItemsCount = cartItems.reduce(
    (acc, item) => acc + item.amount,
    0,
  );
  const cartTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.amount * (item.product?.price || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        cartTotalItemsCount,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
