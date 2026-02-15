/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
}
const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPages } = paginationSlice.actions;
export default paginationSlice.reducer;
