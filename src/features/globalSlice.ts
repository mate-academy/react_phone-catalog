/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type GlobalState = {
  isMenuOpened: boolean;
};

const initialState: GlobalState = {
  isMenuOpened: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsMenuOpened: (st, ac) => {
      st.isMenuOpened = ac.payload;
    },
  },
});

export const { setIsMenuOpened } = globalSlice.actions;
export default globalSlice.reducer;
