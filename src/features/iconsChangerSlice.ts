/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IconsChangerType = {
  hidenMenuIco: string;
};

const initialState: IconsChangerType = {
  hidenMenuIco: './icons/burger-menu-ico.svg',

  // heartIco: './icons/heart-ico.svg',
  // heartRedIco: './icons/heart-red-ico.svg',
  // homeIco: './icons/heart-red-ico.svg',
  // minusIco: './icons/minus-ico.svg',
  // plusIco: './icons/plus-ico.svg',
  // searchIco: './icons/search-ico.svg',
  // basketIco: './icons/basket-ico.svg',
  // burgerMenuIco: './icons/burger-menu-ico.svg',
  // closeIco: './icons/close-ico.svg',
  // closeLightIco: './icons/close-light-ico.svg',

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
  },
});

export default iconsChangerSlice.reducer;
export const { setHidenMenuIco } = iconsChangerSlice.actions;
