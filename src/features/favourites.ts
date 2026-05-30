/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';

const storedFavourites = localStorage.getItem('favourites');
const initialState = {
  items: storedFavourites
    ? (JSON.parse(storedFavourites) as Product[])
    : ([] as Product[]),
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavouritesProducts(state, action: PayloadAction<Product>) {
      const isAlreadyExist = state.items.some(
        item => item.id === action.payload.id,
      );

      if (isAlreadyExist) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem('favourites', JSON.stringify(state.items));
    },
  },
});

export const { setFavouritesProducts } = favouritesSlice.actions;
export default favouritesSlice.reducer;
