import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/entities/Product';

export interface CartItem {
  id: string;
  quantity: number;
  item: Product;
}

export interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const useCartStoreRaw = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.item.itemId === product.itemId,
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.item.itemId === product.itemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { id: String(product.id), quantity: 1, item: product },
            ],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.item.itemId !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.item.itemId === id ? { ...i, quantity } : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.item.itemId === id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.item.itemId === id
              ? { ...i, quantity: Math.max(1, i.quantity - 1) }
              : i,
          ),
        })),
    }),
    {
      name: 'cart-storage',
    },
  ),
);

const emptyCartState: CartStore = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
};

export const useCartStore = <T>(selector: (state: CartStore) => T): T => {
  const serverState = selector(emptyCartState);
  const clientState = useCartStoreRaw(selector);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  return hydrated ? clientState : serverState;
};
