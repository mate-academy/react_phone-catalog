import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from '../types';

type Props = {
  children: ReactNode;
};

type CartItemType = {
  product: Product;
  quantityCarts: number;
};

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
  quantityCarts: number;
  updateQuantity: (item: Product, newQuantity: number) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  quantityCarts: 0,
  updateQuantity: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  function updateQuantity(item: Product, newQuantity: number) {
    setCartItems(
      cartItems.map(cartItem =>
        cartItem.product.id === item.id
          ? { ...cartItem, quantityCarts: newQuantity }
          : cartItem,
      ),
    );
  }

  useEffect(() => {
    const cartItemsStr = JSON.stringify(cartItems);

    localStorage.setItem('cart', cartItemsStr);
  }, [cartItems]);

  useEffect(() => {
    const saved = localStorage.getItem('cart');

    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  const quantityCarts = cartItems.reduce(
    (acc, item) => acc + item.quantityCarts,
    0,
  );

  function addToCart(item: Product) {
    const isInCart = cartItems.some(cartItem => {
      return cartItem.product.id === item.id;
    });

    if (isInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.product.id === item.id
            ? { ...cartItem, quantityCarts: cartItem.quantityCarts + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { product: item, quantityCarts: 1 }]);
    }
  }

  function removeFromCart(itemId: number) {
    setCartItems(cartItems.filter(item => item.product.id !== itemId));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        quantityCarts,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
