import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getAllProducts } from '../api/products';

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const init = createAsyncThunk<Product[], void>(
  'products/fetch',
  async () => {
    const products = await getAllProducts();

    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      init.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Failed to fetch products';
    });
  },
});

export default productsSlice.reducer;
