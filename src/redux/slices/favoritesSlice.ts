import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
