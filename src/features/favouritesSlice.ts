/* eslint no-param-reassign: "error" */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductPhone } from '../Type/phone';

type FavouritesState = {
  favouritesPhones: ProductPhone[]
  loaded: boolean,
  hasError: boolean,
};

const initialState: FavouritesState = {
  favouritesPhones: [],
  loaded: false,
  hasError: false,
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourites: (favourites, action: PayloadAction<ProductPhone>) => {
      favourites.favouritesPhones.push(action.payload);
    },
    removeFavourites: (favourites, action: PayloadAction<ProductPhone>) => {
      favourites.favouritesPhones = favourites.favouritesPhones
        .filter(phone => phone.id !== action.payload.id);
    },

    clearFavourites: (favourites) => {
      favourites.favouritesPhones = [];
    },
  },
});

export const {
  addFavourites, removeFavourites, clearFavourites,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
