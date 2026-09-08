/* eslint-disable no-param-reassign */
import { getProducts } from '../../services/products';
import { LoadingStatus } from '../../types/LoadingStatus';
import { Product } from '../../types/Product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
  products: Product[];
  loading: LoadingStatus;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: 'pending',
  error: null,
};

export const init = createAsyncThunk<Product[]>('products/fetch', getProducts);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = 'pending';
      state.error = null;
      state.products = [];
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(init.rejected, state => {
      state.loading = 'rejected';
      state.error = 'Something went wrong!';
    });
  },
});

export default productsSlice.reducer;
