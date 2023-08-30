/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SearchSlice = {
  searchQuery: string;
  appliedSearchQuery: string;
  isSearchLoading: boolean,
};

const initialState: SearchSlice = {
  searchQuery: '',
  appliedSearchQuery: '',
  isSearchLoading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setAppliedSearchQuery: (state, action: PayloadAction<string>) => {
      state.appliedSearchQuery = action.payload;
    },
    setIsSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchLoading = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
      state.appliedSearchQuery = '';
    },
  },
});

export const {
  setSearchQuery,
  setAppliedSearchQuery,
  setIsSearchLoading,
  clearSearchQuery,
} = searchSlice.actions;
export default searchSlice.reducer;
