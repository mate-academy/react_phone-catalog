import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { getProductDetails } from '../api/products';
import { ProductDetails } from '../types/ProductDetails';
import { ErrorType } from '../types/Error';

type ProductDetailsState = {
  product: ProductDetails | null,
  loaded: boolean,
  isError: ErrorType | null,
};

const initialState: ProductDetailsState = {
  product: null,
  loaded: false,
  isError: null,
};

export const getDetails = createAsyncThunk(
  'productDetails/fetch', (productId: string) => {
    return getProductDetails(productId);
  },
);

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ProductDetails>) => ({
      ...state,
      product: action.payload,
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(getDetails.pending, (state) => ({
      ...state,
      loaded: false,
    }));

    builder.addCase(getDetails.fulfilled, (state, action) => ({
      ...state,
      product: action.payload,
      loaded: true,
    }));

    builder.addCase(getDetails.rejected, (state) => ({
      ...state,
      isError: ErrorType.GET_PRODUCT_DETAILS,
      loaded: true,
    }));
  },
});

export default selectedProductSlice.reducer;
export const { setSelectedProduct } = selectedProductSlice.actions;
