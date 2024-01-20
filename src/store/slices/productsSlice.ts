/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../../api/getProducts';
import { Product } from '../../helpers/types/Product';

export const productsInit = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  // query: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  hasError: false,
  // query: '',
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productsInit.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(productsInit.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    });

    builder.addCase(productsInit.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
