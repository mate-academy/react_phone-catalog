/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

type DescriptionItem = {
  title: string;
  text: string[];
};

export type ProductDetails = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: DescriptionItem[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export interface ProductState {
  product: ProductDetails | null;
  products: ProductDetails[] | null;
  shortProductInfo: Product | null;
  shortProductsInfo: Product[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  products: null,
  shortProductInfo: null,
  shortProductsInfo: null,
  loading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (param: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const productsData = await fetch('./api/products.json');
    const products: Product[] = await productsData.json();
    const shortProductInfo =
      (await products.find(item => item.itemId === param)) ?? ({} as Product);

    const response = await fetch(`./api/${shortProductInfo?.category}.json`);
    const fullProducts: ProductDetails[] = await response.json();
    const product =
      fullProducts.find(item => item.id === param) ?? ({} as ProductDetails);

    return { product, shortProductInfo, products, fullProducts };
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.products = action.payload.fullProducts;
        state.shortProductInfo = action.payload.shortProductInfo;
        state.shortProductsInfo = action.payload.products;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export default productSlice.reducer;
