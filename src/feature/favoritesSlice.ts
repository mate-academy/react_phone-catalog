import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../type/Phone';

const initialState: Phone[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites: (phones, action: PayloadAction<Phone>) => {
      phones.push(action.payload);
    },
    removeFavorites: (phones, action: PayloadAction<Phone>) => {
      return phones.filter(phone => phone.id !== action.payload.id);
    },
    clearFavorites: () => [],
  },
});

export default favoritesSlice.reducer;
export const {
  addFavorites,
  removeFavorites,
  clearFavorites,
} = favoritesSlice.actions;
