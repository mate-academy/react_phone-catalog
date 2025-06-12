import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationStatus } from '../types/pagination';

interface PaginationState {
  status: 'all' | '4' | '8' | '16';
  currentPage: number;
}

const initialState: PaginationState = {
  status: 'all',
  currentPage: 1,
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
  },
});
export const { setStatusPagin, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
