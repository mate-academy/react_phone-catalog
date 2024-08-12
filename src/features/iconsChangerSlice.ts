/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IconsChangerType = {
  hidenMenuIco: string;

  favouriteIco: string;
  searchIco: string;
  basketIco: string;
  burgerMenuIco: string;
  closeIco: string;
  closeLightIco: string;
};

const initialState: IconsChangerType = {
  hidenMenuIco: './icons/burger-menu-ico.svg',

  favouriteIco: './icons/heart-ico.svg',
  // minusIco: './icons/minus-ico.svg',
  // plusIco: './icons/plus-ico.svg',
  searchIco: './icons/search-ico.svg',
  basketIco: './icons/basket-ico.svg',
  burgerMenuIco: './icons/burger-menu-ico.svg',
  closeIco: './icons/close-ico.svg',
  closeLightIco: './icon s/close-light-ico.svg',

  // arrowUpIco: './icons/arrow-up-ico.svg',
  // arrowUpLightIco: './icons/arrow-up-light-ico.svg',
  // arrowDownIco: './icons/arrow-down-ico.svg',
  // arrowDownLightIco: './icons/arrow-down-light-ico.svg',
  // arrowLeftIco: './icons/arrow-left-ico.svg',
  // arrowLeftLightIco: './icons/arrow-left-light-ico.svg',
  // arrowRightIco: './icons/aroow-right-ico.svg',
  // arrowRightLightIco: './icons/arrow-right-light-ico.svg',
};

const iconsChangerSlice = createSlice({
  name: 'iconsChanger',
  initialState,
  reducers: {
    setHidenMenuIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setFavouriteIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setHomeIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setSearchIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setBastekIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setBurgerMenuIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setCloseIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
  },
});

export default iconsChangerSlice.reducer;
export const {
  setHidenMenuIco,
  setFavouriteIco,
  setHomeIco,
  setSearchIco,
  setBastekIco,
  setBurgerMenuIco,
  setCloseIco,
} = iconsChangerSlice.actions;
