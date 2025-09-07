// src/components/pages/ProductPage/ShoppingCart/CartProvider.jsx
import React, { useState, useEffect } from 'react';
import { CartContext } from './cartContextHelpers';

export const CartProvider = ({ children }) => {
  // Ініціалізація з localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');

      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      // У випадку помилки повертаємо пустий масив
      return [];
    }
  });

  // Оновлення localStorage при зміні cartItems
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Додавання в корзину
  const addToCart = product => {
    setCartItems(prevItems => {
      const existing = prevItems.find(
        item =>
          item.id === product.id &&
          item.color === product.color &&
          item.capacity === product.capacity,
      );

      if (existing) {
        return prevItems.map(item =>
          item.id === product.id &&
          item.color === product.color &&
          item.capacity === product.capacity
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Видалення з корзини
  const removeFromCart = (id, color, capacity) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item =>
          !(
            item.id === id &&
            item.color === color &&
            item.capacity === capacity
          ),
      ),
    );
  };

  // Оновлення кількості товару
  const updateQuantity = (id, color, capacity, action) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => {
          if (
            item.id === id &&
            item.color === color &&
            item.capacity === capacity
          ) {
            const newQuantity =
              action === 'increase' ? item.quantity + 1 : item.quantity - 1;

            // Якщо кількість стала менша 1 - видаляємо товар
            if (newQuantity < 1) {
              return null;
            }

            return { ...item, quantity: newQuantity };
          }

          return item;
        })
        .filter(Boolean),
    );
  };

  // Очищення корзини після підтвердження
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
