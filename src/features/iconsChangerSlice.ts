/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IconsChangerType = {
  hidenMenuIco: string;
  searchIco: string;
  burgerMenuIco: string;
  closeIco: string;
  darkMenuIco: string;
  darkCloseIco: string;
};

const initialState: IconsChangerType = {
  hidenMenuIco: '',
  searchIco: './icons/search-ico.svg',
  burgerMenuIco: './icons/burger-menu-ico.svg',
  closeIco: './icons/close-ico.svg',
  darkMenuIco: '/icons/dark-theme-icons/menu-ico.svg',
  darkCloseIco: '/icons/dark-theme-icons/close-ico.svg',
};

const iconsChangerSlice = createSlice({
  name: 'iconsChanger',
  initialState,
  reducers: {
    setHidenMenuIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
  },
});

export default iconsChangerSlice.reducer;
export const { setHidenMenuIco } = iconsChangerSlice.actions;
