import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IPhone } from '../../types/Phone.interface';
import type { RootState } from '../../app/store';

type Favourites = {
  quantityFavourites: number,
  favourites: IPhone[],
};

const initialState: Favourites = {
  quantityFavourites: 0,
  favourites: [],
};

const favouritesSlices = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<IPhone>) {
      const hasPhones = state.favourites.find(
        (phones) => phones.itemId === action.payload.itemId,
      );

      if (!hasPhones) {
        state.favourites.push({
          ...action.payload,
        });
        state.quantityFavourites += 1;
      } else {
        state.favourites = state.favourites.filter(
          (phones) => phones.itemId !== action.payload.itemId,
        );
        state.quantityFavourites -= 1;
      }
    },
  },
});

export const selectFavouritesPhones
 = (state: RootState) => state.favourites.favourites;
export const selectFavouritesQuantity
  = (state: RootState) => state.favourites.quantityFavourites;

export const { addToFavourites } = favouritesSlices.actions;
export default favouritesSlices.reducer;
