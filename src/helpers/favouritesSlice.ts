import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../types/Phone';

const initialState: Phone[] = [];

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourites: (phones, action: PayloadAction<Phone>) => {
      phones.push(action.payload);
    },
    removeFavourites: (phones, action: PayloadAction<Phone>) => {
      return phones.filter(phone => phone.id !== action.payload.id);
    },
    clearFavourites: () => [],
  },
});

export default favouritesSlice.reducer;
export const { addFavourites, removeFavourites, clearFavourites }
  = favouritesSlice.actions;
