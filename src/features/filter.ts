/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type FilterStatus = 'newest' | 'alphabetically' | 'price';

const initialState = {
  filterStatus: 'newest',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchedFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { searchedFilterStatus } = filterSlice.actions;
export default filterSlice.reducer;
