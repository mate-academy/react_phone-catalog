/* eslint-disable no-console */
import { getProducts } from '../api/getProducts';
import { Product } from '../types/Phone';

export enum LocaleDataTypes {
  FAVORITES = 'favorites',
  CART = 'cart',
}

export function setFavorite(id: string, data: LocaleDataTypes) {
  getProducts().then((products) => {
    const favorite = products.find((product: Product) => product.id === id);

    const favorites = localStorage.getItem(data);

    const favoritesObj = favorites ? JSON.parse(favorites) : {};

    if (favoritesObj[id]) {
      delete favoritesObj[id];
      localStorage.setItem(data, JSON.stringify(favoritesObj));
    } else {
      favoritesObj[id] = favorite;
      localStorage.setItem(data, JSON.stringify(favoritesObj));
    }
  });
}

export function isAdded(id: string, data: LocaleDataTypes) {
  return JSON.stringify(localStorage.getItem(data)).includes(id);
}
