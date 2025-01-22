import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJson } from '../helpers/fetchData';
import { Product } from '../types/product';

export type AllProducts = {
  products: Product[];
  loading: boolean;
  error: boolean;
};

const initialState: AllProducts = {
  products: [],
  loading: false,
  error: false,
};

const productsUrl = 'products.json';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const products = await getJson<Product[]>(productsUrl);

    const updatedProductsWithId = [];

    for (const item of products) {
      item.id = item.itemId;
      updatedProductsWithId.push(item);
    }

    return { updatedProductsWithId };
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        const currentState = state;

        currentState.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        const currentState = state;

        currentState.loading = false;
        currentState.products = action.payload.updatedProductsWithId;
      })
      .addCase(fetchAllProducts.rejected, state => {
        const currentState = state;

        currentState.loading = false;
        currentState.error = true;
      });
  },
});

export default productsSlice.reducer;
