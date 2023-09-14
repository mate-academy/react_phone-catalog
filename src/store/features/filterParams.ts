/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  storedSort: string,
  storedPerPage: string,
};

const initialState: State = {
  storedSort: 'age',
  storedPerPage: '16',
};

const filterParams = createSlice({
  name: 'filterParams',
  initialState,
  reducers: {
    newSort: (state, action: PayloadAction<string>) => {
      state.storedSort = action.payload;
    },

    newPerPage: (state, action: PayloadAction<string>) => {
      state.storedPerPage = action.payload;
    },
  },
});

export const { newSort, newPerPage } = filterParams.actions;
export default filterParams.reducer;
