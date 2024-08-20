import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../types/Product';
import {
  getAccessoriesDetails,
  getPhoneDetails,
  getProduct,
  getTabletsDetails,
} from '../utils/fetchClient';
import { ProductDetails } from '../types/ProductDetails';

export interface ProductState {
  products: Products[];
  phones: Products[];
  tablets: Products[];
  accessories: Products[];
  deteils: ProductDetails[];
  productDetails: ProductDetails | null;
  loading: boolean;
  error: boolean;
}

export const fetchProduct = createAsyncThunk('product/fetch', () => {
  return getProduct();
});

export const fetchDetailsPhone = createAsyncThunk('phone/details', () => {
  return getPhoneDetails();
});

export const fetchDetailsTablet = createAsyncThunk('tablets/details', () => {
  return getTabletsDetails();
});

export const fetchDetailsAccessories = createAsyncThunk(
  'accessories/details',
  () => {
    return getAccessoriesDetails();
  },
);

const initialState: ProductState = {
  products: [],
  phones: [],
  tablets: [],
  accessories: [],
  deteils: [],
  productDetails: null,
  loading: false,
  error: false,
};

export const ProductsState = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productDetails: (
      state: ProductState,
      action: PayloadAction<ProductDetails>,
    ) => {
      return {
        ...state,
        productDetails: action.payload,
      };
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchProduct.pending, state => {
      return {
        ...state,
        loading: true,
        error: false,
      };
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        products: action.payload,
        phones: action.payload.filter(
          (phone: Products) => phone.category === 'phones',
        ),
        tablets: action.payload.filter(tablet => tablet.category === 'tablets'),
        accessories: action.payload.filter(
          accessori => accessori.category === 'accessories',
        ),
      };
    });

    builder.addCase(fetchProduct.rejected, state => {
      return {
        ...state,
        loading: false,
        error: true,
      };
    });

    builder.addCase(fetchDetailsPhone.fulfilled, (state, action) => {
      return {
        ...state,
        deteils: action.payload,
      };
    });

    builder.addCase(fetchDetailsTablet.fulfilled, (state, action) => {
      return {
        ...state,
        deteils: action.payload,
      };
    });

    builder.addCase(fetchDetailsAccessories.pending, state => {
      return {
        ...state,
        error: false,
      };
    });

    builder.addCase(fetchDetailsAccessories.fulfilled, (state, action) => {
      return {
        ...state,
        deteils: action.payload,
      };
    });

    builder.addCase(fetchDetailsAccessories.rejected, state => {
      return {
        ...state,
        error: true,
      };
    });
  },
});

export default ProductsState.reducer;
export const { productDetails } = ProductsState.actions;
