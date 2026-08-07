import { getProducts } from '@api/products';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from 'src/types/Product';

export const fetchProducts = createAsyncThunk('products/fetch', () =>
  getProducts(),
);

type ProductsState = {
  items: Product[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  hasError: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchProducts.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const productsReducer = productsSlice.reducer;
