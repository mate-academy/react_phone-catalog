/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

export interface FavoritesState {
  favorites: Product[];
  totalInFavorites: number;
}

const initialFavorites = localStorage.getItem('favorites')
  ? JSON.parse(localStorage.getItem('favorites') as string)
  : [];

const initialState: FavoritesState = {
  favorites: initialFavorites,
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
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<Product['itemId']>) => {
      const index = state.favorites.findIndex(
        item => item.itemId === action.payload,
      );

      if (index >= 0) {
        state.favorites.splice(index, 1);
        state.totalInFavorites -= 1;
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
