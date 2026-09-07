import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts } from '../../api/products';
import { ProductsState } from './types/ProductsState';

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
  newModels: [],
  hotPrice: [],
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

      state.newModels = state.products
        .sort((p1, p2) => p2.year - p1.year)
        .slice(0, 10);

      state.hotPrice = state.products
        .sort((p1, p2) => p2.fullPrice - p2.price - (p1.fullPrice - p1.price))
        .slice(0, 10);
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default productsSlice.reducer;

export const init = createAsyncThunk('products/fetch', () => {
  return getProducts();
});
