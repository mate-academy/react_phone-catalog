import { createSlice } from '@reduxjs/toolkit';

const theme = localStorage.getItem('theme');

interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value: theme !== null ? JSON.parse(theme) : 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.value === 'light') {
        // eslint-disable-next-line no-param-reassign
        state.value = 'dark';
      } else {
        // eslint-disable-next-line no-param-reassign
        state.value = 'light';
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
