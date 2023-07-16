import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../type/Phone';

const initialState: Phone[] = [];

const favoritesSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    deleteCart: (state, action: PayloadAction<string>) => {
      return state.filter((phone: Phone) => phone.id !== action.payload);
    },
    addCart: (state, action: PayloadAction<Phone>) => {
      return [...state, action.payload];
    },
  },
});

export const { deleteCart, addCart } = favoritesSlice.actions;
export default favoritesSlice.reducer;
