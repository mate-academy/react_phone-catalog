import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../types/ProductDetails';

export interface FavoritesState {
  favorites: ProductDetails[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ProductDetails>) => {
      const itemIndex = state.favorites.findIndex(
        item => item.id === action.payload.id,
      );

      if (itemIndex < 0) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<ProductDetails['id']>,
    ) => {
      const index = state.favorites.findIndex(
        item => item.id === action.payload,
      );

      if (index >= 0) {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
