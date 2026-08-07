import { getCategoryDetails } from '@api/products';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from '@shared/constants/categoryConfig';
import { ProductDetails } from '@src/types/ProductDetails';

export const fetchCategoryDetails = createAsyncThunk(
  'productDetails/fetch',
  (category: Category) => getCategoryDetails(category),
);

type ProductDetailsState = {
  items: Partial<Record<Category, ProductDetails[]>>;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: ProductDetailsState = {
  items: {},
  isLoading: false,
  hasError: false,
};

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategoryDetails.pending, state => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchCategoryDetails.fulfilled, (state, action) => {
      const category = action.meta.arg;

      state.items[category] = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchCategoryDetails.rejected, state => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export const productDetailsReducer = productDetailsSlice.reducer;
