/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadPrevState } from '@utils/loadPrevState';

export const NAME = 'shoppingCart';

type State = {
  ids: {
    [key: string]: number;
  };
  length: number;
};

const initialState: State = loadPrevState<State>(NAME) || {
  ids: {},
  length: 0,
};

const shoppingCartSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<number>) => {
      const id = `${action.payload}`;
      const count = state.ids[id];

      if (count) {
        delete state.ids[id];
        state.length -= count;
      } else {
        state.ids[id] = 1;
        state.length += 1;
      }
    },

    add: (state, action: PayloadAction<number>) => {
      const id = `${action.payload}`;

      state.length += 1;
      state.ids[id] = 1 + (state.ids[id] || 0);
    },
    take: (state, action: PayloadAction<number>) => {
      const id = `${action.payload}`;
      const count = state.ids[id];

      if (count) {
        if (count === 1) {
          delete state.ids[id];
        } else {
          state.ids[id] -= 1;
        }

        state.length -= 1;
      }
    },
  },
});

export default shoppingCartSlice.reducer;
export const { toggle, add: plus, take } = shoppingCartSlice.actions;
