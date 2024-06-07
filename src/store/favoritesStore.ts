import { create } from 'zustand';
import Product from '../types/Product';

type FavoritesStore = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
};

export const useFavoritesStore = create<FavoritesStore>(set => ({
  favorites: [],

  toggleFavorite: (product: Product) =>
    set(state => {
      const isProductInFavorites = state.favorites.some(
        item => item.id === product.id,
      );

      return {
        favorites: isProductInFavorites
          ? state.favorites.filter(item => item.id !== product.id)
          : [...state.favorites, product],
      };
    }),
}));
