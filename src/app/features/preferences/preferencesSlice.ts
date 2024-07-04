/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageManager } from '../../../utils/getLocalStorageManager';

type State = {
  isThemeDark: boolean;
};

export const themeManager = getLocalStorageManager<boolean>('isThemeDark');

const initialState: State = {
  isThemeDark: themeManager.get() || false,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setIsThemeDark(state, { payload }: PayloadAction<boolean>) {
      state.isThemeDark = payload;
    },
  },
});

export const { setIsThemeDark } = preferencesSlice.actions;
