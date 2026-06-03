import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { CartItem, Product } from '../types';

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, next: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = 'phone_catalog_cart';

function readCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(storageKey);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          item.quantity *
            (item.product.price ??
              item.product.priceDiscount ??
              item.product.priceRegular ??
              0),
        0,
      ),
    [items],
  );

  const addToCart = (product: Product) => {
    setItems(current => {
      if (
        current.some(
          item => item.id === product.itemId || item.id === product.id,
        )
      ) {
        return current;
      }

      return [
        ...current,
        {
          id: (product.itemId || product.id).toString(),
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const changeQuantity = (id: string, next: number) => {
    setItems(current =>
      current.map(item => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          quantity: next > 0 ? next : item.quantity,
        };
      }),
    );
  };

  const clearCart = () => setItems([]);

  const isInCart = (id: string) => items.some(item => item.id === id);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalAmount,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};
