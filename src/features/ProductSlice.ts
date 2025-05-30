import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/products"
import { fetchProducts } from "../api/fetchProducts";

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string;
}

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error:'',
}

export const init = createAsyncThunk('product/fetch', () => {
  return fetchProducts();
})

/* eslint-disable no-param-reassign */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    })
   builder.addCase(init.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message || 'Failed to load products';
});
  }
})

/* eslint-enable no-param-reassign */

export const {  } = productsSlice.actions;

export default productsSlice.reducer;
