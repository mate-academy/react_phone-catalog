//#region imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductDetails } from '../../modules/shared/types/ProductDetails';
import { Category } from '../../modules/shared/constants/categories';
import { get } from '../../services/get';
//#endregion

export const loadProductDetails = createAsyncThunk(
  'productDetails/fetch',
  async (category: Category) => {
    return get<ProductDetails[]>(`/${category}.json`);
  },
);

export interface ProductDetailsState {
  items: ProductDetails[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ProductDetailsState = {
  items: [],
  isLoading: false,
  isError: false,
};

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadProductDetails.pending, state => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(loadProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.items.push(...action.payload);
    });

    builder.addCase(loadProductDetails.rejected, state => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
