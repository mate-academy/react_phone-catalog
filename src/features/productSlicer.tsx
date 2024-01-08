/* eslint-disable max-len */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { getProductDetails, getProducts } from '../api/products';

type ProductState = {
  items: Product[];
  itemDetail: ProductDetails | null;
  selectedImage: string;
  loading: boolean;
  hasError: string | null;
};

const productState: ProductState = {
  items: [],
  itemDetail: null,
  selectedImage: '',
  loading: true,
  hasError: null,
};

export const productsInit = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

export const productDetailsInit = createAsyncThunk('productDetails/fetch', (id: string) => {
  return getProductDetails(id);
});

export const productsSLicer = createSlice({
  name: 'products',
  initialState: productState,
  reducers: {
    setSelectedImage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectedImage: action.payload,
      };
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(productsInit.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(productsInit.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    });
    builder.addCase(productsInit.rejected, (state) => {
      return {
        ...state,
        loading: false,
        hasError: 'Error',
      };
    });
    builder.addCase(productDetailsInit.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(productDetailsInit.fulfilled, (state, action) => {
      return {
        ...state,
        itemsDetail: action.payload,
        selectedImage: action.payload.images[0],
        loading: false,
      };
    });
    builder.addCase(productDetailsInit.rejected, (state) => {
      return {
        ...state,
        loaded: false,
        hasError: 'Error',
      };
    });
  },
});

export const { setSelectedImage, setLoaded } = productsSLicer.actions;
export default productsSLicer.reducer;
