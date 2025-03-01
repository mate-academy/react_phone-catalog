import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getProducts } from '../../api/fetchProducts';

import { Product } from '../../types/Product';

export interface Products {
  products: Product[];
  loading: boolean;
  error: boolean;
}

const initialState: Products = {
  products: [],
  loading: false,
  error: false,
};

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  const products = await getProducts();

  return products;
});

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        loadProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          return { ...state, products: action.payload, loading: false };
        },
      )
      .addCase(loadProducts.rejected, state => {
        return { ...state, error: true, loading: false };
      });
  },
});

export default ProductsSlice.reducer;
