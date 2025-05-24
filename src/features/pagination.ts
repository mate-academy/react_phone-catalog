import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaginationStatus = 4 | 8 | 16 | 'all';

interface PaginationState {
  paginationStatus: PaginationStatus;
  currentPage: number;
}

const initialState: PaginationState = {
  paginationStatus: 'all',
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPaginationStatus: (state, action: PayloadAction<PaginationStatus>) => {
      state.paginationStatus = action.payload;
      state.currentPage = 1; // reset to first page when pagination changes
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPaginationStatus, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
