import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/entities/Product';

export interface FavoriteItem {
  id: string;
  item: Product;
}

export interface FavoriteStore {
  items: FavoriteItem[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: string) => void;
}

const useFavoriteStoreRaw = create<FavoriteStore>()(
  persist(
    (set) => ({
      items: [],
      addFavorite: (product) =>
        set((state) => {
          const exists = state.items.some(
            (i) => i.item.itemId === product.itemId,
          );
          if (exists) return state;
          return {
            items: [...state.items, { id: String(product.id), item: product }],
          };
        }),
      removeFavorite: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.item.itemId !== id),
        })),
    }),
    {
      name: 'favorite-storage',
    },
  ),
);

const emptyFavoriteState: FavoriteStore = {
  items: [],
  addFavorite: () => {},
  removeFavorite: () => {},
};

export const useFavoritesStore = <T>(
  selector: (state: FavoriteStore) => T,
): T => {
  const serverState = selector(emptyFavoriteState);
  const clientState = useFavoriteStoreRaw(selector);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  return hydrated ? clientState : serverState;
};
