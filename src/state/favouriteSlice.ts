/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FavouritesState {
  products: string[];
}

const initialState: FavouritesState = {
  products: [],
};

const favouritesSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<string>) => {
      if (!state.products.includes(action.payload)) {
        state.products.push(action.payload);
      } else {
        state.products = state.products.filter(
          product => product !== action.payload,
        );
      }
    },
  },
});

export const selectFavourites = (state: RootState) => state.favourites.products;

export const { addProduct } = favouritesSlice.actions;

export default favouritesSlice.reducer;
