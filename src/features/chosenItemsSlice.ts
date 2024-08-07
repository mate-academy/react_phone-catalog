/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { Phone } from '../types/Phone';
import { Tablet } from '../types/Tablet';
import { Accessory } from '../types/Accessory';

type CurrentGadgetType = Phone | Tablet | Accessory | null;

type ChosenItemsType = {
  favorite: Product[];
  cart: Product[];
  currentGadget: CurrentGadgetType;
  currentProduct: Product | null;
};

const initialState: ChosenItemsType = {
  currentGadget: null,
  favorite: [],
  cart: [],
  currentProduct: null,
};

const chosenItemsSlice = createSlice({
  name: 'chosenItems',
  initialState,
  reducers: {
    setCurrentGadget: (state, action: PayloadAction<CurrentGadgetType>) => {
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
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
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
  setCurrentProduct,
} = chosenItemsSlice.actions;
