import { create } from 'zustand';
import Product from '../types/Product';

type ProductStore = {
  cartItems: Product[];
  favorites: Product[];
  toggleProductInCart: (product: Product) => void;
  toggleFavorite: (product: Product) => void;
};

export const useProductStore = create<ProductStore>(set => ({
  cartItems: [],
  favorites: [],

  toggleProductInCart: (product: Product) =>
    set(state => {
      const isProductInCart = state.cartItems.some(
        item => item.id === product.id,
      );

      return {
        cartItems: isProductInCart
          ? state.cartItems.filter(item => item.id !== product.id)
          : [...state.cartItems, product],
      };
    }),

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
