/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: localStorage.getItem('language') || 'en',
  supported: ['en', 'uk', 'de'],
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const currentLanguage = (state) => state.language.current;
export default languageSlice.reducer;
