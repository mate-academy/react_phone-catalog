import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
/* eslint-disable no-param-reassign */

export interface FavoritesState {
  favorites: Product[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload;
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    addFavorite: (state, action: PayloadAction<Product | null>) => {
      const match = state.favorites.some(
        product => product.id === action.payload?.id,
      );

      if (action.payload && !match) {
        state.favorites.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    deleteFavorite: (state, action: PayloadAction<Product>) => {
      state.favorites = state.favorites.filter(
        product => product.id !== action.payload.id,
      );
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const {
  addFavorite,
  deleteFavorite,
  setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
