/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BooleanType = {
  isMenuShown: boolean;
  isAddedToCart: boolean;
  isCheckoutModal: boolean;
  reloadTrigger: boolean;
  isWrongParams: boolean;
  isDark: boolean;
  language: string;
};

const initialState: BooleanType = {
  isMenuShown: false,
  isAddedToCart: false,
  isCheckoutModal: false,
  reloadTrigger: false,
  isWrongParams: false,
  isDark: false,
  language: 'ua',
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
    setIsWrongParams: (state, action: PayloadAction<boolean>) => {
      state.isWrongParams = action.payload;
    },
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export default booleanSlice.reducer;
export const {
  setIsMenuShown,
  setIsAddedToCart,
  setIsCheckoutModal,
  setReloadTrigger,
  setIsWrongParams,
  setIsDark,
  setLanguage,
} = booleanSlice.actions;
