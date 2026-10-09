/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../interface/interface';

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        item =>
          item.itemId === action.payload.itemId ||
          item.id === action.payload.id,
      );

      if (exists) {
        state.items = state.items.filter(
          item =>
            item.itemId !== action.payload.itemId &&
            item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
