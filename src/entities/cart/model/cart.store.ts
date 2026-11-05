import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { MAX_CART_ITEM_QUANTITY } from './cart.constants';
import type { CartItem, CartState } from './cart.types';

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem(productId: number) {
        set((state) => {
          const existing = state.items.find(
            (item: CartItem) => item.productId === productId,
          );

          if (existing) {
            return {
              items: state.items.map((item: CartItem) =>
                item.productId === productId ?
                  {
                    ...item,
                    quantity: Math.min(
                      item.quantity + 1,
                      MAX_CART_ITEM_QUANTITY,
                    ),
                  }
                : item,
              ),
            };
          }

          return {
            items: [...state.items, { productId, quantity: 1 }],
          };
        });
      },

      removeItem(productId: number) {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity(productId, quantity) {
        if (!Number.isFinite(quantity)) return;

        const normalizedQuantity = Math.min(
          Math.trunc(quantity),
          MAX_CART_ITEM_QUANTITY,
        );

        set((state) => ({
          items:
            normalizedQuantity <= 0 ?
              state.items.filter((item) => item.productId !== productId)
            : state.items.map((item) =>
                item.productId === productId ?
                  { ...item, quantity: normalizedQuantity }
                : item,
              ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);
