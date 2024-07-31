/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IconsChangerType = {
  hidenMenuIco: string;
  favoriteHeard: string;
};

const initialState: IconsChangerType = {
  hidenMenuIco: './icons/burger-menu-ico.svg',
  favoriteHeard: './icons/heart-ico.svg',
};

const iconsChangerSlice = createSlice({
  name: 'iconsChanger',
  initialState,
  reducers: {
    setHidenMenuIco: (state, action: PayloadAction<string>) => {
      state.hidenMenuIco = action.payload;
    },
    setFavoriteHeard: (state, action: PayloadAction<string>) => {
      state.favoriteHeard = action.payload;
    },
  },
});

export default iconsChangerSlice.reducer;
export const { setHidenMenuIco, setFavoriteHeard } = iconsChangerSlice.actions;
