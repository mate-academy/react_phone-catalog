import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product } from '../../../shared/types/Product';
import toast from 'react-hot-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: Product['id']) => void;
  decreaseQuantity: (productId: Product['id']) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    toast('Added to cart', { icon: '🛒' });
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.product.id === product.id,
      );

      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId: Product['id']) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);

      if (existingItem?.quantity === 1) {
        return prevCart.filter(item => item.product.id !== productId);
      }

      return prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };

  const removeFromCart = (productId: Product['id']) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast('Removed from cart', { icon: '🗑️' });
  };

  const clearCart = () => {
    setCart([]);
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
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalCount,
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
