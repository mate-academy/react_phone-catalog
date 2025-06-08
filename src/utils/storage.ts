import { CartProduct } from '../types/cartProduct';
import { Product } from '../types/productTypes';
import { State } from '../types/reducerTypes';

/* eslint-disable no-console */
export const getInitialState = (): State => {
  let cart: CartProduct[] = [];
  let favourites: Product[] = [];
  const products: Product[] = [];
  let theme: 'light' | 'dark' = 'light';

  try {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      theme = storedTheme === 'dark' ? 'dark' : 'light';
    }
  } catch (e) {
    console.warn('There was a problem with loading theme', e);
  }

  try {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      cart = JSON.parse(storedCart);
    }
  } catch (e) {
    console.warn('There was a problem with loading basket', e);
  }

  try {
    const storedFavourites = localStorage.getItem('favourites');

    if (storedFavourites) {
      favourites = JSON.parse(storedFavourites);
    }
  } catch (e) {
    console.warn('There was a problem with loading favourites', e);
  }

  return { cart, favourites, products, theme };
};
