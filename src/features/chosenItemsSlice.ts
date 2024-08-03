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
    setAddTofavorite: (state, action: PayloadAction<Product>) => {
      state.favorite.push(action.payload);
    },
    setDeleteFromfavorite: (state, action: PayloadAction<Product>) => {
      const index = state.favorite.findIndex(
        obj => obj.id === action.payload.id,
      );

      state.favorite.splice(index, 1);
    },
    setCleanFavorite: state => {
      state.favorite = [];
    },
    setAddToCart: (state, action: PayloadAction<Product>) => {
      state.cart.push(action.payload);
    },
    setDeleteFromCart: (state, action: PayloadAction<Product>) => {
      const index = state.cart.findIndex(obj => obj.id === action.payload.id);

      state.cart.splice(index, 1);
    },
    setCleanCart: state => {
      state.cart = [];
    },
  },
});

export default chosenItemsSlice.reducer;
export const {
  setAddTofavorite,
  setDeleteFromfavorite,
  setAddToCart,
  setCleanFavorite,
  setCleanCart,
  setDeleteFromCart,
} = chosenItemsSlice.actions;
