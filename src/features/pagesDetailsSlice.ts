/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PagesDetails } from './../types/PageDetails';
import { CartNumberOfItems } from './../types/PageDetails';

const initialState: PagesDetails = {
  title: '',
  models: 0,
  cartNumberOfItems: {},
};

const pagesDetailsSlice = createSlice({
  name: 'pagesDetails',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setModels: (state, action: PayloadAction<number>) => {
      state.models = action.payload;
    },
    setCartNumberOfItems: (state, action: PayloadAction<CartNumberOfItems>) => {
      state.cartNumberOfItems = action.payload;
    },
    cleanCartNumberOfItems: state => {
      state.cartNumberOfItems = {};
    },
    initializeCartNumberOfItems: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      state.cartNumberOfItems[key] = 1;
    },
    addToCartNumberOfItems: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      if (state.cartNumberOfItems[key] !== undefined) {
        state.cartNumberOfItems[key] = state.cartNumberOfItems[key] + 1;
      } else {
        return;
      }

      localStorage.setItem(
        'cartNumberOfItems',
        JSON.stringify(state.cartNumberOfItems),
      );
    },
    minusFromCartNumberOfItems: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      if (state.cartNumberOfItems[key] !== undefined) {
        state.cartNumberOfItems[key] = state.cartNumberOfItems[key] - 1;
      } else {
        return;
      }

      localStorage.setItem(
        'cartNumberOfItems',
        JSON.stringify(state.cartNumberOfItems),
      );
    },
    deleteFromCartNumberOfItems: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      delete state.cartNumberOfItems[key];
    },
  },
});

export default pagesDetailsSlice.reducer;
export const {
  setTitle,
  setModels,
  setCartNumberOfItems,
  addToCartNumberOfItems,
  minusFromCartNumberOfItems,
  cleanCartNumberOfItems,
  initializeCartNumberOfItems,
  deleteFromCartNumberOfItems,
} = pagesDetailsSlice.actions;
