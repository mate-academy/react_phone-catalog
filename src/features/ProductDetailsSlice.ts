import { fetchOneProducts } from '../api/fetchOneTypeProducts';
import { FullProduct } from '../types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type ProductDetailState = {
  product: FullProduct | null;
  models: FullProduct[] | [];

  loading: boolean;
  error: string;
  allAvailableColor: string[];
};
const initialState: ProductDetailState = {
  product: null,

  models: [],
  loading: false,
  error: '',
  allAvailableColor: [],
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
      state.allAvailableColor = action.payload.allAvailableColor;
      state.loading = false;
    });
    builder.addCase(detailsProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to load product';
    });
  },
});
export default productDetailsSlice.reducer;
