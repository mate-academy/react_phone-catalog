import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isInCart: (productId: string) => boolean;
  getCartItemQuantity: (productId: string) => number;
  getTotalItems: () => number;
  getTotalPrice: (products: Product[]) => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === productId);

      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prev, { productId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);

      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.productId === productId);
  };

  const getCartItemQuantity = (productId: string) => {
    const cartItem = cartItems.find(item => item.productId === productId);

    return cartItem ? cartItem.quantity : 0;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  const getTotalPrice = (products: Product[]) => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find(
        prod => prod.id.toString() === cartItem.productId,
      );

      if (product) {
        return total + product.price * cartItem.quantity;
      }

      return total;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        getCartItemQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
