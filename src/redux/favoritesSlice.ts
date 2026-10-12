import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
  favorite_ids: string[];
}

const initialState: FavoritesState = {
  favorite_ids: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      state.favorite_ids.push(action.payload);
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.favorite_ids = state.favorite_ids.filter(
        id => id !== action.payload,
      );
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
