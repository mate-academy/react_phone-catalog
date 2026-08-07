import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  const theme = localStorage.getItem('theme') as Theme;

  return theme === 'dark' ? 'dark' : 'light';
};

const initialState: Theme = getInitialTheme();

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => (state === 'light' ? 'dark' : 'light'),
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
