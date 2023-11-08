/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/products';

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
  query: string;
}

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  hasError: false,
  query: '',
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const products = await getProducts();

  return products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setQuery: (state: ProductsState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export const { setProducts, setQuery } = productsSlice.actions;
export default productsSlice.reducer;
