import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/shared/types';

interface FavouritesState {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
  isFavourite: (id: string | number) => boolean;
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      toggleFavourite: (product) => {
        const { favourites } = get();
        const exists = favourites.some((item) => item.id === product.id);

        set({
          favourites:
            exists ?
              favourites.filter((item) => item.id !== product.id)
            : [...favourites, product],
        });
      },

      isFavourite: (id) => {
        return get().favourites.some((item) => item.id === id);
      },
    }),
    {
      name: 'favourites-storage',
    },
  ),
);
