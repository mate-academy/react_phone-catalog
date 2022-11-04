import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */

export interface QueryState {
  query: string;
}

const initialState: QueryState = {
  query: '',
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    deleteQuery: (state) => {
      state.query = '';
    },
  },
});

export const {
  setQuery,
  deleteQuery,
} = querySlice.actions;

export default querySlice.reducer;
