import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllDetails } from '../../api/data';
import { ProductDetailsType } from '../../types/ProductDetailsType';

type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type ProductDetailsState = {
  productsDetails: ProductDetailsType[],
  status: StatusType,
  hasError: boolean,
};

const initialState: ProductDetailsState = {
  productsDetails: [],
  status: 'idle',
  hasError: false,
};

export const fetchProductDetails = createAsyncThunk(
  'productDetails/getProductDetails', (product: string) => {
    return getAllDetails(product);
  },
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.productsDetails = action.payload;
      state.status = 'succeeded';
    });

    builder.addCase(fetchProductDetails.rejected, (state) => {
      state.status = 'failed';
      state.hasError = true;
    });
  },
});

export default productDetailsSlice.reducer;
