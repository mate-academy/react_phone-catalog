import Product from '../types/Product';
import { create } from 'zustand';

type FavoritesStore = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
};

export const useFavoritesStore = create<FavoritesStore>(set => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  toggleFavorite: (product: Product) =>
    set(state => {
      const isProductInFavorites = state.favorites.some(
        item => item.id === product.id,
      );

      const newFavorites = isProductInFavorites
        ? state.favorites.filter(item => item.id !== product.id)
        : [...state.favorites, product];

      localStorage.setItem('favorites', JSON.stringify(newFavorites));

      return {
        favorites: newFavorites,
      };
    }),
}));
