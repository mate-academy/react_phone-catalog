// eslint-disable-next-line import/no-extraneous-dependencies
import { create } from 'zustand';
import { Product } from '../types/Propduct';

interface Favorites {
  favorites: Product[];
  addFavorite: (fav: Product) => void;
  removeFavorite: (itemId: string) => void;
}

interface Basket {
  basket: Product[];
  addToBasket: (product: Product) => void;
  removeFromBasket: (itemId: string) => void;
  removeOneProductFromBasket: (itemId: string) => void;
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

export const useBasket = create<Basket>(set => ({
  basket: JSON.parse(localStorage.getItem('basket') ?? '[]') || [],
  addToBasket: product =>
    set(state => {
      localStorage.setItem(
        'basket',
        JSON.stringify([...state.basket, product]),
      );

      return {
        basket: [...state.basket, product],
      };
    }),
  removeFromBasket: itemId =>
    set(state => {
      localStorage.setItem(
        'basket',
        JSON.stringify([
          ...state.basket.filter(elem => elem.itemId !== itemId),
        ]),
      );

      return {
        basket: [...state.basket.filter(product => product.itemId !== itemId)],
      };
    }),
  removeOneProductFromBasket: itemId =>
    set(state => {
      const indexToRemove = state.basket
        .map(product => product.itemId)
        .lastIndexOf(itemId);

      if (indexToRemove !== -1) {
        const updatedBasket = [
          ...state.basket.slice(0, indexToRemove),
          ...state.basket.slice(indexToRemove + 1),
        ];

        localStorage.setItem('basket', JSON.stringify(updatedBasket));

        return {
          basket: updatedBasket,
        };
      }

      return { basket: [...state.basket] };
    }),
}));