import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const saved = localStorage.getItem('favorites');

const initialState: Product[] = saved ? JSON.parse(saved) : [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, { payload }: PayloadAction<Product>) => {
      state.push(payload);
    },
    remove: (state, { payload }: PayloadAction<number>) => {
      return state.filter(e => e.id !== payload);
    },
  },
});

export default favoritesSlice.reducer;

export const { add, remove } = favoritesSlice.actions;
