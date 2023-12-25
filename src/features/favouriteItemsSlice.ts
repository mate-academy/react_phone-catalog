/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { initFavourites } from '../utils/initFavourites';
import { saveFavourites } from '../utils/saveFavourites';

const KEY = 'FAVOURITE_ITEMS';
const initialFavourites = initFavourites(KEY);

export type FavouriteItemsState = {
  favouriteItems: Product[];
};

const initialState: FavouriteItemsState = {
  favouriteItems: initialFavourites,
};

const favouriteItemsSlice = createSlice({
  name: 'favouriteItems',
  initialState,
  reducers: {
    addToFavourites: (state, action: PayloadAction<Product>) => {
      state.favouriteItems = [...state.favouriteItems, action.payload];

      saveFavourites(KEY, state.favouriteItems);
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      state.favouriteItems = state.favouriteItems
        .filter(favouriteItem => favouriteItem.id !== action.payload);

      saveFavourites(KEY, state.favouriteItems);
    },
  },
});

export const {
  addToFavourites,
  removeFromFavourites,
} = favouriteItemsSlice.actions;
export default favouriteItemsSlice.reducer;
