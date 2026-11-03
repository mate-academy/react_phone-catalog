import { createContext, useCallback, useMemo, type ReactNode } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage';

export type CartEntry = {
  itemId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartEntry[];
  totalQuantity: number;
  addToCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useLocalStorage<CartEntry[]>('cart', []);

  const addToCart = useCallback(
    (itemId: string) => {
      setItems(current => {
        const existingItem = current.find(item => item.itemId === itemId);

        if (existingItem) {
          return current.map(item => {
            if (item.itemId === itemId) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }

            return item;
          });
        }

        return [...current, { itemId, quantity: 1 }];
      });
    },
    [setItems],
  );

  const increaseQuantity = addToCart;

  const decreaseQuantity = useCallback(
    (itemId: string) => {
      setItems(current =>
        current.map(item =>
          item.itemId === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    },
    [setItems],
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      setItems(current => current.filter(item => item.itemId !== itemId));
    },
    [setItems],
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const totalQuantity = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalQuantity,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      totalQuantity,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
