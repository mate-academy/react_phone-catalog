/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';

export interface LayoutThemeState {
  theme: ThemeType;
}

const initialState: LayoutThemeState = { theme: 'light' };

const layoutThemeSlice = createSlice({
  name: 'layoutTheme',
  initialState,
  reducers: {
    toggleTheme: state => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';

      state.theme = nextTheme;
    },
  },
});

export default layoutThemeSlice.reducer;

export const { actions } = layoutThemeSlice;
