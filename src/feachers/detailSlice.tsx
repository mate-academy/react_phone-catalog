// /* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';
import { Product } from '../services/productType';

export const addToFavorites = createAction<Product[]>('favorites/add');
export const removeFromFavorites = createAction<Product[]>('favorites/remove');
export const addToCart = createAction<Product[]>('cart/add');
export const removeFromCart = createAction<Product[]>('cart/remove');

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
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.favorites = state.favorites.filter(
        item => item.id !== action.payload.id,
      );
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
  },
});

export default favoritesAndCardSlice.reducer;
