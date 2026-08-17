import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const getProductId = (item: Product) => item.itemId || item.id;

  const addToCart = (product: Product) => {
    setCart(prev => {
      const id = getProductId(product);
      const existingItem = prev.find(item => getProductId(item.product) === id);

      if (existingItem) {
        return prev.map(item =>
          getProductId(item.product) === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev =>
      prev.filter(item => getProductId(item.product) !== productId),
    );
  };

  const increaseQuantity = (productId: string) => {
    setCart(prev =>
      prev.map(item =>
        getProductId(item.product) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart(prev =>
      prev
        .map(item => {
          if (getProductId(item.product) === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        })
        .filter(item => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some(item => getProductId(item.product) === productId);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isInCart,
        totalCount,
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
