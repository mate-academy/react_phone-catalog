// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  theme: string;
};

const initialState: ThemeState = {
  theme: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light') {
        // eslint-disable-next-line no-param-reassign
        state.theme = 'dark';
      } else if (state.theme === 'dark') {
        // eslint-disable-next-line no-param-reassign
        state.theme = 'light';
      }

      localStorage.setItem('theme', state.theme);
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(state.theme);
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
