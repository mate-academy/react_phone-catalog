/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadPrevState } from '@utils/loadPrevState';

export const NAME = 'favorites';

type State = string[];

const initialState: State = loadPrevState<State>(NAME) || [];

const favoritesSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.indexOf(itemId);

      if (index !== -1) {
        state.splice(index, 1);
      } else {
        state.push(itemId);
      }
    },
  },
});

export default favoritesSlice.reducer;
export const { toggle } = favoritesSlice.actions;
