import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/Product';

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string | number) => void;
  isFavorite: (productId: string | number) => boolean; // Додано для зручності перевірки
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: productToAdd => {
        set(state => {
          // Перевіряємо, чи товар вже є в улюблених
          const exists = state.favorites.some(
            item => item.id === productToAdd.id,
          );

          if (!exists) {
            return { favorites: [...state.favorites, productToAdd] };
          }

          return state; // Якщо вже є, не змінюємо стан
        });
      },

      removeFavorite: productIdToRemove => {
        set(state => ({
          favorites: state.favorites.filter(
            item => item.id !== productIdToRemove,
          ),
        }));
      },

      isFavorite: productId => {
        return get().favorites.some(item => item.id === productId);
      },
    }),
    {
      name: 'favorites-storage', // Назва ключа в localStorage
      storage: createJSONStorage(() => localStorage), // Використовуємо localStorage
    },
  ),
);

export default useFavoritesStore;
