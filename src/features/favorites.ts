/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
const initialState = {
  items: [] as Product[],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    deleteFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.itemId !== action.payload);
    },
  },
});

export const { addFavorite, deleteFavourite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
