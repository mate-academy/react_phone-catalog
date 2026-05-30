/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getProducts } from '../httpClient';

type State = { products: Product[]; loading: boolean; error: string };

const initialState: State = { products: [], loading: false, error: '' };

export const fetchProducts = createAsyncThunk(
  'fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts();

      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue('Something went wrong :(');
      }

      return rejectWithValue('Unknown error');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = (action.payload as string) || 'Error';
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
