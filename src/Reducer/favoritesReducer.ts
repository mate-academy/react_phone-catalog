import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../type/Phone';

const initialState: Phone[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    deleteFavorite: (state, action: PayloadAction<string>) => {
      return state.filter((phone: Phone) => phone.id !== action.payload);
    },
    addFavorites: (state, action: PayloadAction<Phone>) => {
      return [...state, action.payload];
    },
  },
});

export const { deleteFavorite, addFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
