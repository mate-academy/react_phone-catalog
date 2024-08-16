/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductInfo } from '../types/ProductInfo';
import { getAccessories, getPhones, getTablets } from '../api';
import { ProductCategory } from '../types/ProductCategory';

export type ProductsState = {
  selectedProduct: ProductInfo | null;
  loading: boolean;
  error: boolean;
};

const initialState: ProductsState = {
  selectedProduct: null,
  loading: false,
  error: false,
};

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (data: { productId: string; category: ProductCategory }) => {
    let product: ProductInfo | undefined;

    switch (data.category) {
      case ProductCategory.PHONES:
        product = (await getPhones()).find(p => p.id === data.productId);
        break;
      case ProductCategory.TABLETS:
        product = (await getTablets()).find(p => p.id === data.productId);
        break;
      case ProductCategory.ACCESSORIES:
        product = (await getAccessories()).find(p => p.id === data.productId);
        break;
      default:
        throw new Error('Invalid product category');
    }

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  },
);

export const productInfoSlice = createSlice({
  name: 'productInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productInfoSlice.reducer;
