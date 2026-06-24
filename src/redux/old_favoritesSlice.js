/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      const product = action.payload;

      if (!state.items.some(item => item.id === product.id)) {
        state.items.push(product);
      }
    },

    removeFromFavorites: (state, action) => {
      const productId = action.payload;

      state.items = state.items.filter(item => item.id !== productId);
    },
  },
});

export const currentFavoriteItems = (state) => state.favorites.items;
export const isProductInFavorites = (state, productId) =>
  state.favorites.items.some(item => item.id === productId);
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
