/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type IconsChangerType = {
  hidenMenuIco: string;
};

const initialState: IconsChangerType = {
  hidenMenuIco: './icons/burger-menu-ico.svg',
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