import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '../types/ProductItem';
import { localClient } from '../helpers/localClient';

export interface FavouritesState {
  favourites: ProductItem[];
}

const initialState: FavouritesState = {
  favourites: localClient.read('favourites') || [], // Make sure it defaults to an empty array
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ProductItem>) {
      state.favourites.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      return {
        ...state,
        favourites: state.favourites.filter(item => item.id !== action.payload),
      };
    },
  },
});

export const { addItem, removeItem } = favouritesSlice.actions;

export default favouritesSlice.reducer;
