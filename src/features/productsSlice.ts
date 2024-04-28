/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductInfo } from '../types/ProductInfo';
import { getAccessories, getPhones, getTablets } from '../api';
import { ProductCategory } from '../types/ProductCategory';

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

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const phones = await getPhones();
    const tablets = await getTablets();
    const accessories = await getAccessories();

    return { phones, tablets, accessories };
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category: ProductCategory) => {
    let products: ProductInfo[] = [];

    switch (category) {
      case ProductCategory.PHONES:
        products = await getPhones();
        break;
      case ProductCategory.TABLETS:
        products = await getTablets();
        break;
      case ProductCategory.ACCESSORIES:
        products = await getAccessories();
        break;
      default:
        break;
    }

    return products;
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
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.phones = action.payload.phones;
        state.tablets = action.payload.tablets;
        state.accessories = action.payload.accessories;
      })
      .addCase(fetchAllProducts.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state[action.meta.arg] = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setQuery } = productsSlice.actions;
export default productsSlice.reducer;
