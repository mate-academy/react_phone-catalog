import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initializeFavorites(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
    },
    addToFavorites(state, action: PayloadAction<string>) {
      const productId = action.payload;

      if (!state.ids.includes(productId)) {
        state.ids.push(productId);
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
  },
});

export const selectFavorites = (state: RootState) => state.favorites.ids;

export const selectFavoritesCount = (state: RootState) =>
  state.favorites.ids.length;

export const selectIsFavorite = (productId: string) => (state: RootState) =>
  state.favorites.ids.includes(productId);

export const { initializeFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
