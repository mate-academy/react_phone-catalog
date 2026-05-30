/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/products';

export interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const addFavoritesSlice = createSlice({
  name: 'addedFavorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { addFavorite, removeFavorite } = addFavoritesSlice.actions;
export default addFavoritesSlice.reducer;
