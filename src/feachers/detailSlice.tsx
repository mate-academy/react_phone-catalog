// /* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../services/productType';

export const addToFavorites = createAction<Product>('favorites/add');
export const removeFromFavorites = createAction<Product>('favorites/remove');
export const addToCart = createAction<Product>('cart/add');
export const removeFromCart = createAction<Product>('cart/remove');

export interface FavoritesAndCardState {
  favorites: Product[];
  cart: Product[];
}

const initialState: FavoritesAndCardState = {
  favorites: [],
  cart: [],
};

export const favoritesAndCardSlice = createSlice({
  name: 'favoritesAndCard',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const item = action.payload;
      const isAlreadyFavorite = state.favorites.some(
        favItem => favItem.id === item.id,
      );

      if (!isAlreadyFavorite) {
        state.favorites.push(item);
      }
    },
    removeFavorite: (state, action) => {
      const itemToRemove = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.favorites = state.favorites.filter(
        item => item.id !== itemToRemove.id,
      );
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const isAlreadyInCart = state.cart.some(
        cartItem => cartItem.id === item.id,
      );

      if (!isAlreadyInCart) {
        state.cart.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const itemToRemove = action.payload;

      // eslint-disable-next-line no-param-reassign
      state.cart = state.cart.filter(item => item.id !== itemToRemove.id);
    },
  },
});

export default favoritesAndCardSlice.reducer;
