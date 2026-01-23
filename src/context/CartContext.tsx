import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../types/Product';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  increaseQuantity: (productId: string | number) => void;
  decreaseQuantity: (productId: string | number) => void;
  isInCart: (productId: string | number) => boolean;
  clearCart: () => void;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartItems');

      if (!saved) {
        return [];
      }

      const parsedItems = JSON.parse(saved);

      return parsedItems.map(
        (item: Product & { count?: number; quantity?: number }) => ({
          ...item,
          quantity: item.quantity || item.count || 1,
        }),
      );
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Dodawanie produktu
  const addToCart = (product: Product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  // Usuwanie
  const removeFromCart = (productId: string | number) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== productId),
    );
  };

  // Zwiększanie
  const increaseQuantity = (productId: string | number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Zmniejszanie
  const decreaseQuantity = (productId: string | number) => {
    setCartItems(currentItems =>
      currentItems.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;

          return { ...item, quantity: newQuantity };
        }

        return item;
      }),
    );
  };

  // Czyszczenie koszyka
  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId: string | number) =>
    cartItems.some(item => item.id === productId);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        isInCart,
        clearCart, // Przekazanie funkcji
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
