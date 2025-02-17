/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadPrevState } from '@utils/loadPrevState';

export const NAME = 'shoppingCart';

type State = {
  itemIds: {
    [key: string]: number;
  };
  length: number;
};

const initialState: State = loadPrevState<State>(NAME) || {
  itemIds: {},
  length: 0,
};

const cartSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const count = state.itemIds[itemId];

      if (count) {
        delete state.itemIds[itemId];
        state.length -= count;
      } else {
        state.itemIds[itemId] = 1;
        state.length += 1;
      }
    },

    add: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;

      state.length += 1;
      state.itemIds[itemId] = 1 + (state.itemIds[itemId] || 0);
    },

    take: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const count = state.itemIds[itemId];

      if (count) {
        if (count === 1) {
          delete state.itemIds[itemId];
        } else {
          state.itemIds[itemId] -= 1;
        }

        state.length -= 1;
      }
    },

    clear: state => {
      state.length = 0;
      state.itemIds = {};
    },
  },
});

export default cartSlice.reducer;
export const { toggle, add, take, clear } = cartSlice.actions;
