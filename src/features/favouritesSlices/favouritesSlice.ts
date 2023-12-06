import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Phone } from '../../types/Phone';
import type { RootState } from '../../app/store';

type Params = {
  favourites: Phone[],
  quantityFavourites: number,
};

const initialState: Params = {
  favourites: [],
  quantityFavourites: 0,
};

const favouritesSlices = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<Phone>) {
      const hasPhones = state.favourites.find(
        (phones) => phones.phoneId === action.payload.phoneId,
      );

      if (!hasPhones) {
        state.favourites.push(action.payload);
        // console.log(hasPhones)
        state.quantityFavourites += 1;
        // console.log(hasPhones.selected);
      } else {
        state.favourites = state.favourites.filter(
          (phones) => phones.phoneId !== action.payload.phoneId,
        );
        state.quantityFavourites -= 1;
        // hasPhones.selected = false;
        // console.log(hasPhones.selected);
      }
    },
  },
});

export const selectFavourites
 = (state: RootState) => state.favourites.favourites;
export const selectQuantityFavourites
  = (state: RootState) => state.favourites.quantityFavourites;
export const { addToFavourites } = favouritesSlices.actions;
export default favouritesSlices.reducer;
