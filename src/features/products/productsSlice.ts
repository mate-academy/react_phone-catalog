/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api/phone';
import { AsyncStatus } from '../../types/AsyncStatus';
import { Product } from '../../types/Product';

export interface ProductsState {
  value: Product[],
  status: AsyncStatus,
}

const initialState: ProductsState = {
  value: [],
  status: AsyncStatus.IDLE,
};

export const incrementAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await getProducts();

    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { reducer, actions } = productsSlice;
