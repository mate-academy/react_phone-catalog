import { createSlice } from '@reduxjs/toolkit';

const theme = localStorage.getItem('theme');

interface ThemeState {
  value: string;
}

const initialState: ThemeState = {
  value: theme !== null ? JSON.parse(theme) : 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value === 'light'
        ? state.value = 'dark'
        : state.value = 'light';
    }
  }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
