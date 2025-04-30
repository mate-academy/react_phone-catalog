import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getProduct } from '../../api/fetchProducts';

import { ShopItem } from '../../types/ShopItem';

interface LoadProductDetailsParams {
  category: string;
  id: string;
}

export interface Product {
  productDetails: ShopItem | null;
  loading: boolean;
  error: boolean;
}

const initialState: Product = {
  productDetails: null,
  loading: false,
  error: false,
};

export const loadProductDetails = createAsyncThunk(
  'product/loadProduct',
  async ({ category, id }: LoadProductDetailsParams) => {
    const product = await getProduct(category, id);

    return product;
  },
);

export const ProductDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(loadProductDetails.pending, state => {
        return { ...state, loading: true };
      })
      .addCase(
        loadProductDetails.fulfilled,
        (state, action: PayloadAction<ShopItem>) => {
          return { ...state, productDetails: action.payload, loading: false };
        },
      )
      .addCase(loadProductDetails.rejected, state => {
        return { ...state, error: true, loading: false };
      });
  },
});

export default ProductDetailsSlice.reducer;
