import { Product } from '../types/Product';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemID: string) => void;
  increaseQuantity: (itemID: string) => void;
  decreaseQuantity: (itemID: string) => void;
  isInCart: (itemID: string) => boolean;
  totalQuantity: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(currentItems => {
      const isAlreadyInCart = currentItems.some(
        item => item.product.itemId === product.itemId,
      );

      if (isAlreadyInCart) {
        return currentItems;
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.product.itemId !== itemId),
    );
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.product.itemId === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  const isInCart = (itemId: string) => {
    return cartItems.some(item => item.product.itemId === itemId);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
        totalQuantity,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error('useCart must be use inside CartProvider');
  }

  return value;
};
