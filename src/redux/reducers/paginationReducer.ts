/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SELECT } from '../../types/Select';

type PaginationState = {
  currentPage: number;
  productsPerPage: SELECT;
};

const initialState: PaginationState = {
  currentPage: 1,
  productsPerPage: SELECT.All,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action) => {
      state.productsPerPage = action.payload;
    },
  },
});

export const { setCurrentPage, setProductsPerPage } = paginationSlice.actions;
export default paginationSlice.reducer;
