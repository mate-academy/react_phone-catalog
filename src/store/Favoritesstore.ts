import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FavoriteItem {
  id: string;
  category: string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  addItem: (item: FavoriteItem) => void;
  removeItem: (id: string) => void;
  clearFavorites: () => void;
  getTotalItems: () => number;
  isInFavorites: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: item => {
        const items = get().items;
        const existingItem = items.find(i => i.id === item.id);

        if (!existingItem) {
          set({ items: [...items, item] });
        }
      },

      removeItem: id => {
        set({ items: get().items.filter(item => item.id !== id) });
      },

      clearFavorites: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.length;
      },

      isInFavorites: id => {
        return get().items.some(item => item.id === id);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
