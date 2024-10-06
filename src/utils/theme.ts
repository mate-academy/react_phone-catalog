import { createSlice } from '@reduxjs/toolkit';

const data = localStorage.getItem('theme');

const initialState = data ? data : 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: () => {
      document.body.classList.add('dark-theme');

      return 'dark';
    },
    removeTheme: () => {
      localStorage.removeItem('theme');
      document.body.classList.remove('dark-theme');

      return 'light';
    },
  },
});

export const { actions } = themeSlice;
export default themeSlice.reducer;
