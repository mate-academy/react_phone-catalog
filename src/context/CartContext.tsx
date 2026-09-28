import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/Product';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItemType[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, delta: number) => void;
  clearCart: () => void;
  totalQuantity: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);

      if (existing) {
        return prevCart;
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const changeQuantity = (productId: number, delta: number) => {
    setCart(
      prevCart =>
        prevCart
          .map(item => {
            if (item.product.id === productId) {
              const newQty = item.quantity + delta;

              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }

            return item;
          })
          .filter(Boolean) as CartItemType[],
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.product.price || 0;

    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
