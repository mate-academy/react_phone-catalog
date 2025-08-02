import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { fetchData } from '../helpers/fetchData';

type ProductsState = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default productsSlice.reducer;

export const init = createAsyncThunk('products/fetch', () => {
  return fetchData<Product[]>('/api/products.json');
});
