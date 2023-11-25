/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../Types/Product';
import { getProducts } from '../../helpers/getProductsFromApi';

type ProductsState = {
  list: Product[];
  loading: boolean;
  error: string;
};

const initialState:ProductsState = {
  list: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await getProducts();

    return response;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export default productsSlice.reducer;
