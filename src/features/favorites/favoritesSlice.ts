import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NormalizedProduct } from 'shared/helpers/normalizeProductType';

import { FavoritesState } from './favorites.types';

const initialState: FavoritesState = {
  FavoriteItems: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<NormalizedProduct>) {
      const index = state.FavoriteItems.findIndex(
        item => item.id === action.payload.id,
      );

      if (index === -1) {
        state.FavoriteItems.push(action.payload);
      } else {
        state.FavoriteItems.splice(index, 1);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
