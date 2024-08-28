// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
import { Product } from '../types/Propduct';

interface Favorites {
  favorites: Product[];
  addFavorite: (fav: Product) => void;
  removeFavorite: (itemId: string) => void;
}

export const useFavorites = create<Favorites>(set => ({
  favorites: JSON.parse(localStorage.getItem('favoriteArr') ?? '') || [],
  addFavorite: (favorite: Product) =>
    set(state => {
      localStorage.setItem(
        'favoriteArr',
        JSON.stringify([...state.favorites, favorite]),
      );

      return {
        favorites: [...state.favorites, favorite],
      };
    }),
  removeFavorite: itemId =>
    set(state => {
      localStorage.setItem(
        'favoriteArr',
        JSON.stringify([
          ...state.favorites.filter(elem => elem.itemId !== itemId),
        ]),
      );

      return {
        favorites: [
          ...state.favorites.filter(favorite => favorite.itemId !== itemId),
        ],
      };
    }),
}));
