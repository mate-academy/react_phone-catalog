import React, { useState } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

type Context = {
  cartItems: CartItem[],
  addCartItems: (product: Product) => void,
  getTotalQuantity: () => number,
  deleteCartItem: (productId: string) => void,
  incrementCounter: (productId: string) => void,
  decrementCounter: (productId: string) => void,
};

export const CartContext = React.createContext<Context>({
  cartItems: [],
  addCartItems: () => {},
  getTotalQuantity: () => 0,
  deleteCartItem: () => {},
  incrementCounter: () => {},
  decrementCounter: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem('Cart') || 'null') || [],
  );

  const saveCartItems = (currentCart: CartItem[]) => {
    setCartItems([...currentCart]);
    localStorage.setItem('Cart', JSON.stringify(currentCart));
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((sum, current) => sum + current.quantity, 0);
  };

  const deleteCartItem = (productId: string) => {
    const productIndex = cartItems.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cartItems.splice(productIndex, 1);
      saveCartItems(cartItems);
    }
  };

  const incrementCounter = (productId: string) => {
    const cartItem = cartItems.find(item => item.id === productId);

    if (cartItem) {
      cartItem.quantity += 1;
      saveCartItems(cartItems);
    }
  };

  const decrementCounter = (productId: string) => {
    const cartItem = cartItems.find(item => item.id === productId);

    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      saveCartItems(cartItems);
    }
  };

  const addCartItems = (product: Product) => {
    saveCartItems([
      ...cartItems,
      {
        id: product.id,
        quantity: 1,
        product,
      },
    ]);
  };

  const contextValue: Context = {
    cartItems,
    addCartItems,
    getTotalQuantity,
    deleteCartItem,
    incrementCounter,
    decrementCounter,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
