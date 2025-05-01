import { Product } from '../../types/Product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type ProductState = {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: '',
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('../../api/products.json');

    if (!response.ok) {
      // throw new Error('Network response was not ok');
      initialState.error = 'Network response was not ok';
    }

    const data = await response.json();

    return data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetStatusProducts: state => {
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});
