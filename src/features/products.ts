import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllProducts } from '../api/products';
import { Product } from '../types/product';

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const data: Product[] = await getAllProducts();

    return data;
  },
);

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        /* eslint-disable no-param-reassign */
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
        state.error = '';
      });
  },
});

export default productsSlice.reducer;
