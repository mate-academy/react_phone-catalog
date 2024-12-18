/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from './types/Product';
import { getAllProducts } from '../utils/api/products';

type ProductState = {
  productList: Product[];
  isProdLoading: boolean;
};

const initialState: ProductState = {
  productList: [],
  isProdLoading: false,
};

export const initProducts = createAsyncThunk('products/fetch', () => {
  return getAllProducts();
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload;
    },
  },
  extraReducers: buider => {
    buider.addCase(initProducts.pending, state => {
      state.isProdLoading = true;
    });
    buider.addCase(initProducts.fulfilled, (state, action) => {
      state.productList = action.payload;
      state.isProdLoading = false;
    });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
