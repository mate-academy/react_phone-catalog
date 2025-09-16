// src/context/CartContext.tsx - Context provider for shopping cart functionality
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../types';

type CartItem = { id: string; qty: number; product: Product };

interface CartCtx {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  totalQty: number;
  totalAmount: number;
}

const Ctx = createContext<CartCtx | undefined>(undefined);
const KEY = 'cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const api: CartCtx = useMemo(
    () => ({
      items,
      add: p =>
        setItems(prev =>
          prev.find(i => i.id === p.id)
            ? prev
            : [...prev, { id: p.id, qty: 1, product: p }],
        ),
      remove: id => setItems(prev => prev.filter(i => i.id !== id)),
      inc: id =>
        setItems(prev =>
          prev.map(i => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
        ),
      dec: (id: string) =>
        setItems(prev =>
          prev.map(i =>
            i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i,
          ),
        ),
      clear: () => setItems([]),
      totalQty: items.reduce((s, i) => s + i.qty, 0),
      totalAmount: items.reduce((s, i) => s + i.qty * i.product.price, 0),
    }),
    [items],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return ctx;
};
