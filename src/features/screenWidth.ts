/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface ScreenWidthState {
  width: number;
}

const initialState: ScreenWidthState = {
  width: window.innerWidth,
};

const screenWidthSlice = createSlice({
  name: 'screenWidth',
  initialState,
  reducers: {
    setScreenWidth(state, action) {
      state.width = action.payload;
    },
  },
});

export const { setScreenWidth } = screenWidthSlice.actions;
export default screenWidthSlice.reducer;
