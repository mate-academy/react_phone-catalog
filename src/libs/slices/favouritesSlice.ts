/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../types';
import { saveToLocalSotrage } from '../utils';

export interface IFavouritesState {
  favouritesItems: IProduct[],
}

const initialState: IFavouritesState = {
  favouritesItems: [],
};

const favouritesSlice = createSlice(
  {
    name: 'favourites',
    initialState,
    reducers: {
      setItems: (state, action: PayloadAction<IProduct[]>) => {
        state.favouritesItems = action.payload;
        saveToLocalSotrage('favouritesItems', state.favouritesItems);
      },
      addItem: (state, action: PayloadAction<IProduct>) => {
        state.favouritesItems.push(action.payload);
        saveToLocalSotrage('favouritesItems', state.favouritesItems);
      },
      deleteItem: (state, action: PayloadAction<string>) => {
        state.favouritesItems = state.favouritesItems.filter(
          el => el.itemId !== action.payload,
        );
        saveToLocalSotrage('favouritesItems', state.favouritesItems);
      },
    },
  },
);

export const {
  setItems,
  addItem,
  deleteItem,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
