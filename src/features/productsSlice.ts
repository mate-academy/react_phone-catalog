import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { Product } from '../types/Product';
import * as ProductApi from '../api/products';

export type ProductsState = {
  items: Product[];
  loaded: boolean,
  hasError: boolean,
};

const initialState: ProductsState = {
  items: [] as Product[],
  loaded: false,
  hasError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  ProductApi.getProducts,
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loaded = false;// eslint-disable-line no-param-reassign
        state.hasError = false;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;// eslint-disable-line no-param-reassign
        state.loaded = true;// eslint-disable-line no-param-reassign
      })
      .addCase(fetchProducts.rejected, (state) => {
        const navigate = useNavigate();

        state.loaded = true;// eslint-disable-line no-param-reassign
        state.hasError = true;// eslint-disable-line no-param-reassign

        navigate('/error', {
          state: { errorMsg: 'Error at the loading time' },
          replace: true,
        });
      });
  },
});

export default productsSlice.reducer;
