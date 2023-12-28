import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductDetails, getProducts } from '../../api/products';
import { Product } from '../../types/product';
import { ProductDetailsType } from '../../types/productDetailsType';

type ProductState = {
  items: Product[],
  itemDetail: ProductDetailsType | null,
  selectedImage: string,
  loaded: boolean,
  hasError: string | null,
};

const productState: ProductState = {
  items: [],
  itemDetail: null,
  selectedImage: '',
  loaded: true,
  hasError: null,
};

export const productsInit = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

export const productDetailsInit
= createAsyncThunk('productDetails/fetch', (productId: string) => {
  return getProductDetails(productId);
});

export const productsSlicer = createSlice({
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
        loaded: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(productsInit.pending, (state) => {
      return {
        ...state,
        loaded: true,
      };
    });
    builder.addCase(productsInit.fulfilled, (state, action) => {
      return {
        ...state,
        items: action.payload,
        loaded: false,
      };
    });
    builder.addCase(productsInit.rejected, (state) => {
      return {
        ...state,
        loaded: false,
        hasError: 'Error',
      };
    });
    builder.addCase(productDetailsInit.pending, (state) => {
      return {
        ...state,
        loaded: true,
      };
    });
    builder.addCase(productDetailsInit.fulfilled, (state, action) => {
      return {
        ...state,
        itemDetail: action.payload,
        selectedImage: action.payload.images[0],
        loaded: false,
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

export const { setSelectedImage, setLoaded } = productsSlicer.actions;

export default productsSlicer.reducer;
