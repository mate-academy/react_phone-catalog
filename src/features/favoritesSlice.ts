/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
/* import { ProductDetails } from '../types/ProductDetails'; */
import { Product } from '../types/Product';

export interface FavoritesState {
  favorites: Product[];
  totalInFavorites: number;
}

const initialState: FavoritesState = {
  favorites: [],
  totalInFavorites: 0,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.favorites.findIndex(
        item => item.itemId === action.payload.itemId,
      );

      if (itemIndex < 0) {
        state.favorites.push(action.payload);
        state.totalInFavorites += 1;
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Product['itemId']>) => {
      const index = state.favorites.findIndex(
        item => item.itemId === action.payload,
      );

      if (index >= 0) {
        state.favorites.splice(index, 1);
        state.totalInFavorites -= 1;
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
