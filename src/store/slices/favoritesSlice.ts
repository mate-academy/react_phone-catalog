import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    // Initialize favorites from localStorage
    initializeFavorites(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
    },
    // Add to favorites
    addToFavorites(state, action: PayloadAction<string>) {
      const productId = action.payload;

      if (!state.ids.includes(productId)) {
        state.ids.push(productId);
      }
    },
    // Remove from favorites
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter(id => id !== action.payload);
    },
  },
});

export const { initializeFavorites, addToFavorites, removeFromFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
