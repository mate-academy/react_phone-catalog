/* eslint-disable no-param-reassign */

import { getAccessories } from '../api/accessories';
import { getPhones } from '../api/phones';
import { getProducts } from '../api/products';
import { getTablets } from '../api/tablets';
import { Product } from '../types/Product';
import { ProductCategory } from '../types/ProductCategory';
import { ProductInfo } from '../types/ProductInfo';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type ProductsState = {
  products: Product[];
  phones: ProductInfo[];
  tablets: ProductInfo[];
  accessories: ProductInfo[];
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  loading: false,
  error: '',
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const products = await getProducts();

    return { products };
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

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<{ products: Product[] }>) => {
          state.products = action.payload.products;
          state.loading = false;
        },
      )
      .addCase(fetchAllProducts.rejected, state => {
        state.loading = false;
        state.error = 'Error!';
      })
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        switch (action.meta.arg) {
          case ProductCategory.PHONES:
            state.phones = action.payload;
            break;
          case ProductCategory.TABLETS:
            state.tablets = action.payload;
            break;
          case ProductCategory.ACCESSORIES:
            state.accessories = action.payload;
            break;
          default:
            break;
        }
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = 'true';
      });
  },
});

export const productsReducer: (
  state: ProductsState | undefined,
  action: PayloadAction<any>,
) => ProductsState = productsSlice.reducer;

export default productsReducer;
