import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { getSuggestedProducts } from '../api/products';
import { ProductCategory } from '../types/ProductCategory';

const initialState = {
  loaded: false,
  hasError: false,
  items: [] as Product[],
};

export const loadSuggestedProducts = createAsyncThunk(
  'suggestedProducts/fetch',
  async ({
    category,
    currentProductId,
  }: {
    category: ProductCategory;
    currentProductId: string;
  }) => {
    return getSuggestedProducts(category, currentProductId);
  },
);

export const suggestedProductsSlice = createSlice({
  name: 'suggestedProducts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadSuggestedProducts.pending, state => {
      return {
        ...state,
        loaded: false,
        hasError: false,
      };
    });
    builder.addCase(loadSuggestedProducts.fulfilled, (state, { payload }) => {
      return { ...state, loaded: true, items: payload };
    });
    builder.addCase(loadSuggestedProducts.rejected, state => {
      return {
        ...state,
        hasError: true,
        loaded: true,
      };
    });
  },
});
