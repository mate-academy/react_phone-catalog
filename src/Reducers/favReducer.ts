import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../type/Products';

const initialState: Products[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    deleteFavorite: (state, action: PayloadAction<string>) => {
      return state.filter((phone: Products) => phone.itemId !== action.payload);
    },
    addFavorites: (state, action: PayloadAction<Products>) => {
      return [...state, action.payload];
    },
  },
});

export const {
  deleteFavorite,
  addFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
