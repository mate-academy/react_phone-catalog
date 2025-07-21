/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductsByCategory } from '../api/products';
import { Category, ProductDetails } from '../types';

type ProductDetailsState = {
  productDetails: ProductDetails | null;
  loading: boolean;
  error: string;
};

const initialState: ProductDetailsState = {
  productDetails: null,
  loading: false,
  error: '',
};

type Props = {
  category: Category;
  productId: string | undefined;
};

export const fetchProductDetails = createAsyncThunk(
  'productDetails/fetch',
  async ({ category, productId }: Props) => {
    const products: ProductDetails[] = await getProductsByCategory(category);

    return products.find(product => product.id === productId);
  },
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ProductDetails>) => {
      state.productDetails = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      if (action.payload) {
        state.productDetails = action.payload;
      }

      state.loading = false;
    });

    builder.addCase(fetchProductDetails.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchProductDetails.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const { reducer, actions } = productDetailsSlice;
