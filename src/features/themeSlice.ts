import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../enums/Theme';

const savedTheme = (localStorage.getItem('appTheme') as Theme) || Theme.Dark;

const initialState = {
  theme: savedTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('appTheme', action.payload);
    },
  },
});

export const { setTheme } = themeSlice.actions;
