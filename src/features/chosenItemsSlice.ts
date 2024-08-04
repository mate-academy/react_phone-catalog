/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ChosenItemsType = {
  favorite: Product[];
  cart: Product[];
};

const initialState: ChosenItemsType = {
  favorite: [],
  cart: [],
};

const chosenItemsSlice = createSlice({
  name: 'chosenItems',
  initialState,
  reducers: {
    addTofavorite: (state, action: PayloadAction<Product>) => {
      state.favorite.push(action.payload);
    },
    deleteFromfavorite: (state, action: PayloadAction<Product>) => {
      const index = state.favorite.findIndex(
        obj => obj.id === action.payload.id,
      );

      state.favorite.splice(index, 1);
    },
    cleanFavorite: state => {
      state.favorite = [];
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    deleteFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(obj => obj.id === action.payload.id);

      state.cart.splice(index, 1);
    },
    cleanCart: state => {
      state.cart = [];
    },
  },
});

export default chosenItemsSlice.reducer;
export const {
  addTofavorite,
  deleteFromfavorite,
  addToCart,
  cleanFavorite,
  cleanCart,
  deleteFromCart,
} = chosenItemsSlice.actions;
