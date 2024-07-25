/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const pathName = window.location.hash;

type HeaderType = {
  menuOnOffIco: string;
};

const initialState: HeaderType = {
  menuOnOffIco: `${pathName === '#/hidenMenu' ? '/icons/close-ico.svg' : './icons/burger-menu-ico.svg'} `,
};

console.log(pathName);

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setMenuIco: (state, action: PayloadAction<string>) => {
      state.menuOnOffIco = action.payload;
    },
  },
});

export default headerSlice.reducer;
export const { setMenuIco } = headerSlice.actions;
