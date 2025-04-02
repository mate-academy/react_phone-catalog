import React, { createContext, useContext, useState } from 'react';
import { Phone } from '../Types/Types';
import { Tablet } from '../Types/Tablet';
import { Accessories } from '../Types/Accessories';

interface CartItem {
  item: Phone | Tablet | Accessories;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  favorites: (Phone | Tablet | Accessories)[];
  addToCart: (item: Phone | Tablet | Accessories) => void;
  addToFavorites: (item: Phone | Tablet | Accessories) => void;
  removeFromCart: (itemId: string) => void;
  removeFromFavorites: (itemId: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartCount: number;
  clearCart: () => void;
  clearFavorites: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<(Phone | Tablet | Accessories)[]>(
    [],
  );

  const cartCount = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  const addToCart = (item: Phone | Tablet | Accessories) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id);

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prev, { item, quantity: 1 }];
    });
  };

  const addToFavorites = (item: Phone | Tablet | Accessories) => {
    setFavorites(prev => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.item.id === id ? { ...cartItem, quantity } : cartItem,
      ),
    );
  };

  const clearCart = () => {
    setCart([]); // Очищає всю корзину
  };

  const clearFavorites = () => {
    setFavorites([]); // Очищає всі улюблені товари
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        addToFavorites,
        removeFromCart,
        removeFromFavorites,
        updateQuantity,
        cartCount,
        clearCart,
        clearFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};
