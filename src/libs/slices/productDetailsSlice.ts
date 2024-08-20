/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductDetails } from '../types';
import { getProductDetails } from '../api/product';
import { RootState } from '../app/store';

export interface IProductDetailsState {
  loaded: boolean;
  hasError: boolean;
  selectedProduct: IProduct | null;
  selectedProductDetails: IProductDetails | null;
}

const initialState: IProductDetailsState = {
  loaded: false,
  hasError: false,
  selectedProduct: null,
  selectedProductDetails: null,
};

type ProductDetailsResponseDto = {
  selectedProduct: IProduct | null;
  selectedProductDetails: IProductDetails | null;
};

export const fetchProductDetails = createAsyncThunk<
  ProductDetailsResponseDto,
  {
    id: string;
  },
  { state: RootState }
>('products/fetchProduct', async (payload, { getState }) => {
  const allProducts = getState().products.allProducts;
  const selectedProduct = allProducts.find(pr => pr.itemId === payload.id);

  if (!selectedProduct) {
    return {
      selectedProduct: null,
      selectedProductDetails: null,
    };
  }

  const selectedProductDetails = await getProductDetails(
    payload.id,
    selectedProduct.category,
  );

  if (!selectedProductDetails) {
    return {
      selectedProduct: null,
      selectedProductDetails: null,
    };
  }

  return {
    selectedProduct,
    selectedProductDetails,
  };
});

const productDetailsSlice = createSlice({
  name: 'productsDetails',
  initialState,
  reducers: {
    resetStore: state => {
      state.selectedProductDetails = null;
      state.selectedProduct = null;
      state.loaded = false;
      state.hasError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.fulfilled, (state, { payload }) => {
        state.loaded = true;
        state.hasError = false;
        state.selectedProduct = payload.selectedProduct;
        state.selectedProductDetails = payload.selectedProductDetails;
      })
      .addCase(fetchProductDetails.rejected, state => {
        state.loaded = true;
        state.hasError = true;
        state.selectedProductDetails = null;
      })
      .addCase(fetchProductDetails.pending, state => {
        state.loaded = false;
        state.hasError = false;
      });
  },
});

export const { resetStore } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
