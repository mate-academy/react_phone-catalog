import { createSlice } from '@reduxjs/toolkit';
import { SORT } from '../../types/Sort';

type SortState = {
  sortBy: SORT;
};

const initialState: SortState = {
  sortBy: SORT.None,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      return {
        ...state,
        sortBy: action.payload,
      };
    },
  },
});

export const { setSortBy } = sortSlice.actions;

export default sortSlice.reducer;
