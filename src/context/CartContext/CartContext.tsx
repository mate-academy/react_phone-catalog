import React, { createContext } from 'react';

import { CartContextType } from '../../types/cart-context.types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ProductType } from '../../types/product.types';
import { CartItemType } from '../../types/cart-item.types';

const CART_STORAGE_KEY = 'cart';

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<CartItemType[]>(CART_STORAGE_KEY, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: ProductType, quantityToAdd = 1) => {
    setCart(currentCart => {
      const existing = currentCart.find(item => item.id === product.id);

      if (existing) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item,
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          quantity: quantityToAdd,
          product: product,
        },
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCart(currentCart => {
      if (newQuantity <= 0 || Number.isNaN(newQuantity)) {
        return currentCart.filter(item => item.id !== itemId);
      }

      return currentCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId: string) => {
    return cart.some(item => item.id === itemId);
  };

  const increaseQuantity = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);

    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);

    if (item) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const contextValue: CartContextType = {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
