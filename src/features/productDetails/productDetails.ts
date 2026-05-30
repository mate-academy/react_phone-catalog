import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetailsState } from './types/ProductDetailsState';
import { getProductDetails } from '../../api/getProductDetails';
import { ProductDetailsType } from '../../types/ProductDetailsType';
import { FetchProductDetailsArgs } from './types/FetchProductDetailsArgs';

const initialState: ProductDetailsState = {
  loading: false,
  product: null,
  error: '',
};

const productDetails = createSlice({
  name: 'product-details',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Something went wrong';
    });
  },
});

export default productDetails.reducer;

export const init = createAsyncThunk<
  ProductDetailsType | null,
  FetchProductDetailsArgs
>('product-details/fetch', async ({ category, productId }) => {
  const product = await getProductDetails(category, productId);

  return product || null;
});
