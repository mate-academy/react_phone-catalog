import React, { useState, useEffect } from 'react';
import { CartContext, CartItem } from './CartContext';
import { Phone, Tablet, Accessories } from '../Types/BaseItem';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [favorites, setFavorites] = useState<(Phone | Tablet | Accessories)[]>(
    () => {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    },
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const toggleCart = (item: Phone | Tablet | Accessories) => {
    setCart((prev) => {
      const exists = prev.some((cartItem) => cartItem.item.id === item.id);
      if (exists) {
        return prev.filter((cartItem) => cartItem.item.id !== item.id);
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId),
    );
  };

  const addToFavorites = (item: Phone | Tablet | Accessories) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== itemId));
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

  const capacityAvailable: string[] = [];
  const capacityPrice = {};

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        toggleCart, // ✅ доступний у контексті
        addToFavorites,
        removeFromCart,
        removeFromFavorites,
        updateQuantity,
        cartCount,
        favouritesCount: favorites.length,
        clearCart,
        clearFavorites,
        capacityAvailable,
        capacityPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
