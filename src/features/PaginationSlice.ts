/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationStatus } from '../types/pagination';

interface PaginationState {
  status: 'all' | '4' | '8' | '16';
  currentPage: number;
  totalPage: number | null;
}

const initialState: PaginationState = {
  status: 'all',
  currentPage: 1,
  totalPage: null,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setStatusPagin: (state, action: PayloadAction<PaginationStatus>) => {
      state.status = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
  },
});
export const { setStatusPagin, setCurrentPage, setTotalPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
