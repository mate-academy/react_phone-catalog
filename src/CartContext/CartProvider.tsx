import React, { useState } from 'react';
import { CartContext, CartItem } from './CartContext';
import { Phone } from '../Types/Types';
import { Tablet } from '../Types/Tablet';
import { Accessories } from '../Types/Accessories';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<(Phone | Tablet | Accessories)[]>(
    [],
  );

  const cartCount = cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  const addToCart = (item: Phone | Tablet | Accessories) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => cartItem.item.id === item.id,
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.item.id === item.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const addToFavorites = (item: Phone | Tablet | Accessories) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((cartItem) => cartItem.item.id !== itemId));
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites(favorites.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.item.id === id ? { ...cartItem, quantity } : cartItem,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearFavorites = () => {
    setFavorites([]);
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
        favouritesCount: favorites.length,
        clearCart,
        clearFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
