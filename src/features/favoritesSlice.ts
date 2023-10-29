import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const initialState: Product[] = JSON.parse(
  localStorage.getItem('favorites') || '[]',
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export default favoritesSlice.reducer;
export const {
  addToFavorites, removeFromFavorites,
} = favoritesSlice.actions;
