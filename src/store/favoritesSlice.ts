import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const productId = action.payload;

      return state.includes(productId)
        ? state.filter(id => id !== productId)
        : [...state, productId];
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
