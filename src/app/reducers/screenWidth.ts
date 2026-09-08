/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ScreenWidthState = {
  width: number;
};

const initialState: ScreenWidthState = {
  width: window.innerWidth,
};

const screenWidthSlice = createSlice({
  name: 'screenWidth',
  initialState,
  reducers: {
    setScreenWidth(state, action: PayloadAction<number>) {
      state.width = action.payload;
    },
  },
});

export const { setScreenWidth } = screenWidthSlice.actions;
export default screenWidthSlice.reducer;
