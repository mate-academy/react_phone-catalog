import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeVars } from '../types/themeTypes';

const initialState = {
  theme: ThemeVars.ORIGIN,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state, action: PayloadAction<ThemeVars>) {
      const currentState = state;

      currentState.theme = action.payload
    },
  },
});

export const { actions } = themeSlice;
export default themeSlice.reducer;