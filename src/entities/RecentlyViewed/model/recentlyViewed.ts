import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/entities/Product';

const MAX_ITEMS = 10;

export interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
  clearItems: () => void;
}

const useRecentlyViewedStoreRaw = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: [
            product,
            ...state.items.filter((i) => i.itemId !== product.itemId),
          ].slice(0, MAX_ITEMS),
        })),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'recently-viewed-storage',
    },
  ),
);

const emptyRecentlyViewedState: RecentlyViewedStore = {
  items: [],
  addItem: () => {},
  clearItems: () => {},
};

export const useRecentlyViewedStore = <T>(
  selector: (state: RecentlyViewedStore) => T,
): T => {
  const serverState = selector(emptyRecentlyViewedState);
  const clientState = useRecentlyViewedStoreRaw(selector);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  return hydrated ? clientState : serverState;
};
