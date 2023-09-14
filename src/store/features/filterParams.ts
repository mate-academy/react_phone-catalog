/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type State = {
  sort: string,
  perPage: string,
};

const initialState: State = {
  sort: 'Newest',
  perPage: '16',
};

const filterParams = createSlice({
  name: 'filterParams',
  initialState,
  reducers: {
    newSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },

    newPerPage: (state, action: PayloadAction<string>) => {
      state.perPage = action.payload;
    },
  },
});

export const { newSort, newPerPage } = filterParams.actions;
export default filterParams.reducer;
