//#region imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../modules/shared/types/Product';
import { get } from '../../services/get';
//#endregion

export const loadProducts = createAsyncThunk('products/fetch', async () => {
  return get<Product[]>('/products.json');
});

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  isError: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadProducts.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.items = action.payload;
    });

    builder.addCase(loadProducts.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
