import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../types/theme';

const storedTheme = localStorage.getItem('theme');

const initialState: Theme = {
  theme: storedTheme || 'light-theme',
};

const currentThemeSlice = createSlice({
  name: 'currentTheme',
  initialState,
  reducers: {
    toggleTheme(state) {
      // eslint-disable-next-line no-param-reassign
      state.theme =
        state.theme === 'light-theme' ? 'dark-theme' : 'light-theme';

      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { toggleTheme } = currentThemeSlice.actions;
export default currentThemeSlice.reducer;
