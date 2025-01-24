/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type GlobalState = {
  isMenuOpened: boolean;
  screenWidth: number;
  language: 'en' | 'ua';
};

const initialState: GlobalState = {
  isMenuOpened: false,
  screenWidth: window.innerWidth,
  language: 'en',
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
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setIsMenuOpened, setScreenWidth, setLanguage } =
  globalSlice.actions;
export default globalSlice.reducer;
