import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  theme: string;
};

const initialState: ThemeState = {
  theme: localStorage.getItem('theme') || 'light-theme',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'light-theme') {
        // eslint-disable-next-line no-param-reassign
        state.theme = 'dark-theme';
      } else if (state.theme === 'dark-theme') {
        // eslint-disable-next-line no-param-reassign
        state.theme = 'light-theme';
      }

      localStorage.setItem('theme', state.theme);
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(state.theme);
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
