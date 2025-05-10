import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

const initialState: Product[] = [];

const favouriteProductsSlice = createSlice({
  name: 'favouriteProducts',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      const exists = state.find(p => p.id === action.payload.id);

      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromFavourites: (state, action: PayloadAction<Product>) => {
      return state.filter(p => p.id !== action.payload.id);
    },
    clearFavourites: () => [],
  },
});

export const { addToFavourites, removeFromFavourites, clearFavourites } =
  favouriteProductsSlice.actions;
export default favouriteProductsSlice.reducer;
