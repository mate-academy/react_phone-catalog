/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type ChosenItemsType = {
  favorite: Product[];
  cart: Product[];
  currentGadget: Product | null;
};

const initialState: ChosenItemsType = {
  currentGadget: null,
  favorite: [],
  cart: [],
};

const chosenItemsSlice = createSlice({
  name: 'chosenItems',
  initialState,
  reducers: {
    setCurrentGadget: (state, action: PayloadAction<Product>) => {
      state.currentGadget = action.payload;
    },
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
  setCurrentGadget,
} = chosenItemsSlice.actions;
