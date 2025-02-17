/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { Theme } from '@sTypes/Theme';
import { loadPrevState } from '@utils/loadPrevState';

export const NAME = 'theme';

function getThemePrefers() {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return Theme.dark;
  }

  return Theme.light;
}

type State = Theme;
const initialState: State = loadPrevState<State>(NAME) || getThemePrefers();

const cartSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    toggle: state => (state === Theme.light ? Theme.dark : Theme.light),
  },
});

export default cartSlice.reducer;
export const { toggle } = cartSlice.actions;
