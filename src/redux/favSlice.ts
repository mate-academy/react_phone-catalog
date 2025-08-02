import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

type FavoritesState = {
  items: Product[];
};

const initialState: FavoritesState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(item => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favSlice.actions;
export default favSlice.reducer;
