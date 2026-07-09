import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  items: string[];
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.items.indexOf(itemId);

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(itemId);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
