import React, { useState, useEffect } from 'react';
import { CartContext, CartItem } from './CartContext';
import { Phone, Tablet, Accessories } from '../Types/BaseItem';
// import { CartItem } from '../Pages/Cart/CartItem';

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
        // Збільшуємо quantity на 1, якщо товар уже є
        return prev.map((cartItem) =>
          cartItem.item.id === item.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
        );
      } else {
        // Додаємо новий товар з quantity = 1
        return [...prev, { item, quantity: 1 }];
      }
    });
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
