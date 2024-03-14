/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../../api/api';
import { ProductInfo } from '../../types/ProductInfo';

export type ProductInfoState = {
  product: ProductInfo | null;
  error: boolean;
  loading: boolean;
};

const initialState: ProductInfoState = {
  product: null,
  error: false,
  loading: false,
};

export const thunkGetProduct = createAsyncThunk(
  'product/fetchProduct',
  (id: string) => {
    return getProduct(id);
  },
);

const productInfoSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeProduct: state => {
      state.product = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(thunkGetProduct.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        thunkGetProduct.fulfilled,
        (state, action: PayloadAction<ProductInfo>) => {
          state.product = action.payload;
          state.loading = false;
        },
      )
      .addCase(thunkGetProduct.rejected, state => {
        state.error = true;
      });
  },
});

export const { removeProduct } = productInfoSlice.actions;

export default productInfoSlice.reducer;
