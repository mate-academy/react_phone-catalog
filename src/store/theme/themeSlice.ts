/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface State {
  isDark: boolean;
}

let isStorageListenerAdded = false;

const handleStorageChange = (event: StorageEvent) => {
  if (event.key === 'theme') {
    window.location.reload();
  }
};

if (!isStorageListenerAdded) {
  window.addEventListener('storage', handleStorageChange);
  isStorageListenerAdded = true;
}

const initialState: State = {
  isDark: localStorage.getItem('theme') === 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.isDark = !state.isDark;
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    },
  },
});

export default themeSlice.reducer;
export const { actions: themeActions } = themeSlice;
