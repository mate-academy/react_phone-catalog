import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductCard } from '../types/productCard';

export interface CartState {
  items: ProductCard[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ProductCard>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
