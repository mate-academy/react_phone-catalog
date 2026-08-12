import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  mode: Theme;
}

const THEME_STORAGE_KEY = 'theme';

const getInitialTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    const currentAttr = document.documentElement.getAttribute('data-theme');

    return currentAttr === 'dark' ? 'dark' : 'light';
  }

  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      const nextTheme = state.mode === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

      return {
        mode: nextTheme,
      };
    },

    setSystemTheme: (state, action: PayloadAction<Theme>) => {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

      if (savedTheme) {
        return state;
      }

      document.documentElement.setAttribute('data-theme', action.payload);

      return {
        mode: action.payload,
      };
    },
  },
});

export const { toggleTheme, setSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
