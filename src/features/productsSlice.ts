import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductItem } from '../types/ProductItem';
import { fetchClient } from '../helpers/fetchClient';

export interface ProductsState {
  products: ProductItem[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: ProductsState = {
  products: [],
  loaded: false,
  hasError: false,
};

export const getProducts = createAsyncThunk(
  'products/fetch', () => {
    return fetchClient.get<ProductItem[]>('/products.json');
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, () => {
        return {
          products: [],
          loaded: false,
          hasError: false,
        };
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
          loaded: true,
          hasError: false,
        };
      })
      .addCase(getProducts.rejected, () => {
        return {
          products: [],
          loaded: true,
          hasError: true,
        };
      });
  },
});

export default productsSlice.reducer;
