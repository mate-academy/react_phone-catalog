/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductInfo } from '../types/ProductInfo';
import { getAccessories, getPhones, getTablets } from '../api';

export type ProductsState = {
  phones: ProductInfo[];
  tablets: ProductInfo[];
  accessories: ProductInfo[];
  loading: boolean;
  error: boolean;
  query: string;
};

const initialState: ProductsState = {
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  error: false,
  query: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const phones = await getPhones();
    const tablets = await getTablets();
    const accessories = await getAccessories();

    return { phones, tablets, accessories };
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.phones = action.payload.phones;
        state.tablets = action.payload.tablets;
        state.accessories = action.payload.accessories;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
