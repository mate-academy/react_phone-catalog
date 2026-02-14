import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FavoriteState } from '../../types/FavoriteState';
import { Product } from '../../types/Product';

const initialState: FavoriteState = {
  favoriteItems: [],
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      state.favoriteItems.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favoriteItems = state.favoriteItems.filter(
        (product) => product.id !== action.payload,
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
