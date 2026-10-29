import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/Product';
import { CartContext, type CartItem } from './CartContext';

const STORAGE_KEY = 'cart';

const readCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

interface Props {
  children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );

  const isInCart = (itemId: string) => {
    return items.some(item => item.id === itemId);
  };

  const addToCart = (product: Product) => {
    setItems(current => {
      if (current.some(item => item.id === product.itemId)) {
        return current;
      }

      return [...current, { id: product.itemId, quantity: 1, product }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const changeQuantity = (id: string, change: number) => {
    setItems(current =>
      current.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        isInCart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
