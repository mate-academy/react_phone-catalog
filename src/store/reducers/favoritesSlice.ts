import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../models/product';

interface ProductsState {
  favorites: Product[] | null,
}

const initialState: ProductsState = {
  favorites: null,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Product>) {
      const { id } = action.payload;

      if (state.favorites) {
        const existingFavItem = state.favorites.find(favItem => favItem.id === id);

        if (existingFavItem) {
          const newState = state.favorites.filter(item => item.id !== id);

          state.favorites = [...newState];
          return;
        }

        state.favorites.push({ ...action.payload })

        return;
      }

      state.favorites = [{ ...action.payload }];
    },
  },
},
);

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

