import { fetchOneProducts } from '../api/fetchOneTypeProducts';
import { Product } from '../types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ProductDetailState = {
  product: Product | null;
  models: Product[] | [];
  loading: boolean;
  error: string;
};
const initialState: ProductDetailState = {
  product: null,
  models: [],
  loading: false,
  error: '',
};

export const detailsProduct = createAsyncThunk(
  'products/fetch',
  ({ category, id }: { category: string; id: string }) => {
    return fetchOneProducts(category, id);
  },
);
export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(detailsProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(detailsProduct.fulfilled, (state, action) => {
      state.product = action.payload.product;

      state.models = action.payload.models;
       state.loading = false;
    });
    builder.addCase(detailsProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load product';
    });
  },
});
export default productDetailsSlice.reducer;
