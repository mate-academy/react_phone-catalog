/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type GlobalState = {
  isMenuOpened: boolean;
  screenWidth: number;
};

const initialState: GlobalState = {
  isMenuOpened: false,
  screenWidth: window.innerWidth,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsMenuOpened: (state, action) => {
      state.isMenuOpened = action.payload;
    },
    setScreenWidth: (state, action) => {
      state.screenWidth = action.payload;
    },
  },
});

export const { setIsMenuOpened, setScreenWidth } = globalSlice.actions;
export default globalSlice.reducer;
