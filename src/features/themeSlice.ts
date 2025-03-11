import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  darkTheme: boolean;
}

const initialState: ThemeState = {
  darkTheme: false,
};

export const themeSlice = createSlice({
  name: 'darkTheme',
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.darkTheme = action.payload;
    },
  },
});

export const {} = themeSlice.actions;
export default themeSlice.reducer;
