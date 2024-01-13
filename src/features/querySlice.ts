/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const querySlice = createSlice({
  name: 'query',
  initialState: '',
  reducers: {
    setQuery: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default querySlice.reducer;
export const { setQuery } = querySlice.actions;
