/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum SearchBarStatus {
  EMPTY = 'empty',
  FILLED = 'filled',
}

export interface SeachBarReducer {
  value: string,
  status: SearchBarStatus,
}

const initialState: SeachBarReducer = {
  value: '',
  status: SearchBarStatus.EMPTY,
};

const searchBarReducer = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    setSearchingValue: (state, action: PayloadAction<string>) => {
      state.status = SearchBarStatus.FILLED;
      state.value = action.payload;
    },
    unsetSearchingValue: (state) => {
      state.status = SearchBarStatus.EMPTY;
      state.value = '';
    },
  },
});

export const { reducer } = searchBarReducer;
export const {
  setSearchingValue, unsetSearchingValue,
} = searchBarReducer.actions;
