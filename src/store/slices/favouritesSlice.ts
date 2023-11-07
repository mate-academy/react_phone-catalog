/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import {
  getLocalStorageData,
  setLocalStorageData,
} from '../../utils/helpers/getLocalStorage';

export interface FavouritesState {
  favourites: Product[];
}

const key = 'favourites';
const initialState: FavouritesState = {
  favourites: getLocalStorageData(key),
};

const favouritesSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.favourites.push(action.payload);
      setLocalStorageData(key, state.favourites);
    },
    deleteFromFavourites: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload,
      );
      setLocalStorageData(key, state.favourites);
    },
  },
});

export const { addToFavourites, deleteFromFavourites }
  = favouritesSlice.actions;
export default favouritesSlice.reducer;
