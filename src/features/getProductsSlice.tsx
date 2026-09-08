/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/products';

export interface SetProductsInterface {
  items: Product[];
  filteredProducts: Product[];
  hasError: boolean;
  loaded: boolean;
  itemsPerPage: number;
  currentPage: number;
}

const initialState: SetProductsInterface = {
  items: [],
  filteredProducts: [],
  hasError: false,
  loaded: false,
  itemsPerPage: 4,
  currentPage: 1,
};

export const getProductsAsync = createAsyncThunk(
  'products/getProductsSlice',
  async () => {
    const response = await fetch(
      'https://avramenkomarina.github.io/react_phone-catalog/api/products.json',
    );
    const products = await response.json();

    return products;
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProductsAsync.pending, state => {
        state.loaded = false;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loaded = true;
        state.items = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(getProductsAsync.rejected, state => {
        state.loaded = true;
        state.hasError = true;
      });
  },
});

export const { setItemsPerPage, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;
