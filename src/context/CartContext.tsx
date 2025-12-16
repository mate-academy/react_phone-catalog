import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType } from '../types/CartItemType';
import { CartContextType } from '../types/CartContextType';

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = 'nice_gadgets_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [total, setTotal] = useState(0);

  // ✅ ЗАГРУЗКА ИЗ localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);

    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  }, []);

  // ✅ ПЕРЕСЧЁТ + СОХРАНЕНИЕ
  useEffect(() => {
    const sum = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    setTotal(sum);
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ добавить товар
  const addItem = (item: CartItemType) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === item.id);

      if (existing) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ➕ +
  const increase = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // ➖ -
  const decrease = (id: string) => {
    setCartItems(items =>
      items
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  // ❌ удалить
  const remove = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        total,
        remove,
        decrease,
        increase,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }

  return context;
};
