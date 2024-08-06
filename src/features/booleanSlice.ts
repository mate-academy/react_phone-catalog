/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BooleanType = {
  isMenuShown: boolean;
  isAddedToCart: boolean;
  isCheckoutModal: boolean;
  reloadTrigger: boolean;
};

const initialState: BooleanType = {
  isMenuShown: false,
  isAddedToCart: false,
  isCheckoutModal: false,
  reloadTrigger: false,
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setIsMenuShown: (state, action: PayloadAction<boolean>) => {
      state.isMenuShown = action.payload;
    },
    setIsAddedToCart: (state, actiion: PayloadAction<boolean>) => {
      state.isAddedToCart = actiion.payload;
    },
    setIsCheckoutModal: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutModal = action.payload;
    },
    setReloadTrigger: state => {
      state.reloadTrigger = !state.reloadTrigger;
    },
  },
});

export default booleanSlice.reducer;
export const {
  setIsMenuShown,
  setIsAddedToCart,
  setIsCheckoutModal,
  setReloadTrigger,
} = booleanSlice.actions;
