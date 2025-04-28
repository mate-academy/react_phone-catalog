/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('theme');
const initialState = {
  currentTheme: ['theme0', 'theme1', 'theme2', 'theme3', 'theme4']
    .includes(savedTheme)
    ? savedTheme
    : 'theme0',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.current = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const currentTheme = (state) => state.theme.current;
export default themeSlice.reducer;
