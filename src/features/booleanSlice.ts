/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BooleanType = {
  isMenuShown: boolean;
  isAddedToCart: boolean;
};

const initialState: BooleanType = {
  isMenuShown: false,
  isAddedToCart: false,
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
  },
});

export default booleanSlice.reducer;
export const { setIsMenuShown, setIsAddedToCart } = booleanSlice.actions;
