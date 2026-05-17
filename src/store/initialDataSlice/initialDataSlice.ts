import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AllProducts } from '../../shared/types/AllProducts/AllProducts';
import { getAllProducts } from '../../shared/services/apiServices';

export interface ProductState {
  data: AllProducts[];
  isLoading: boolean;
  error: string;
}

export const initialState: ProductState = {
  data: [],
  isLoading: true,
  error: '',
};

export const loadProducts = createAsyncThunk('products/fetch', async () => {
  const response = await getAllProducts('/products.json');

  return response.data;
});

export const initialDataSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => ({
        ...state,
        isLoading: true,
        error: '',
      }))
      .addCase(loadProducts.fulfilled, (state, action) => ({
        ...state,
        data: action.payload,
        isLoading: false,
      }))
      .addCase(loadProducts.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message || 'Failed to load products',
      }));
  },
});

export default initialDataSlice.reducer;
