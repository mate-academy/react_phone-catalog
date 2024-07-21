/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getLocalStorData,
  setLocalStorageData,
} from '../helpers/localStorageData';
import { ProductInfo } from '../types/ProductInfo';

export type FavState = {
  favourites: ProductInfo[];
};

const key = 'favourites';

const initialState: FavState = {
  favourites: getLocalStorData(key),
};

const favSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    addToFav: (state: FavState, action: PayloadAction<ProductInfo>) => {
      state.favourites.push(action.payload);
      setLocalStorageData(key, state.favourites);
    },
    deleteFromFav: (state, action: PayloadAction<string>) => {
      const updateFavs = state.favourites.filter(product => {
        return product.id !== action.payload;
      });

      setLocalStorageData(key, updateFavs);

      return {
        ...state,
        favourites: updateFavs,
      };
    },
  },
});

export const { addToFav, deleteFromFav } = favSlice.actions;
export default favSlice.reducer;
