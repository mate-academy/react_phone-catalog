import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { IProduct } from '../../types';

type Favourites = {
  quantityFavourites: number,
  favourites: IProduct[],
};

const initialState: Favourites = {
  quantityFavourites: 0,
  favourites: [],
};

const favouritesSlices = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<IProduct>) {
      const hasProduct = state.favourites.find(
        (product) => product.itemId === action.payload.itemId,
      );

      if (!hasProduct) {
        state.favourites.push({
          ...action.payload,
        });
        state.quantityFavourites += 1;
      } else {
        state.favourites = state.favourites.filter(
          (product) => product.itemId !== action.payload.itemId,
        );
        state.quantityFavourites -= 1;
      }
    },
  },
});

export const selectFavouritesProduct
 = (state: RootState) => state.favourites.favourites;
export const selectFavouritesQuantity
  = (state: RootState) => state.favourites.quantityFavourites;

export const { addToFavourites } = favouritesSlices.actions;
export default favouritesSlices.reducer;
