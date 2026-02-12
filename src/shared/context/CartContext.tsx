import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { load, save } from '../utils/storage';
import type { CartItem } from '../api/types';

type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const KEY = 'cart:v1';

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() =>
    load<CartItem[]>(KEY, []),
  );

  useEffect(() => {
    save(KEY, items);
  }, [items]);

  const api = useMemo<CartContextValue>(() => {
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);

    const add = (id: string) => {
      setItems(prev => {
        const i = prev.find(x => x.productId === id);

        if (i) {
          return prev.map(x =>
            x.productId === id ? { ...x, quantity: x.quantity + 1 } : x,
          );
        }

        return [...prev, { productId: id, quantity: 1 }];
      });
    };

    const remove = (id: string) =>
      setItems(prev => prev.filter(x => x.productId !== id));
    const increase = (id: string) =>
      setItems(prev =>
        prev.map(x =>
          x.productId === id ? { ...x, quantity: x.quantity + 1 } : x,
        ),
      );
    const decrease = (id: string) =>
      setItems(prev =>
        prev
          .map(x => {
            if (x.productId !== id) {
              return x;
            }

            const q = x.quantity - 1;

            return q > 0 ? { ...x, quantity: q } : x;
          })
          .filter(x => x.quantity > 0),
      );

    const setQty = (id: string, qty: number) =>
      setItems(prev => {
        if (qty <= 0) {
          return prev.filter(x => x.productId !== id);
        }

        const exists = prev.some(x => x.productId === id);

        return exists
          ? prev.map(x => (x.productId === id ? { ...x, quantity: qty } : x))
          : [...prev, { productId: id, quantity: qty }];
      });

    const clear = () => setItems([]);

    return { items, totalQty, add, remove, increase, decrease, setQty, clear };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }

  return ctx;
};
