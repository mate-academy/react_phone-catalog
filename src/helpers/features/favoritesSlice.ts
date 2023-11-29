/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type FavoritesState = {
  favorites: Product[];
};

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addProduct: (state: FavoritesState, action: PayloadAction<Product>) => {
      state.favorites.push(action.payload);
    },
    removeProduct: (state: FavoritesState, action: PayloadAction<string>) => {
      state.favorites = state.favorites
        .filter(favorite => favorite.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;
