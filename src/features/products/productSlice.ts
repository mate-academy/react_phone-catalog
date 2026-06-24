/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Product } from '../../types/product';
import { getPublicUrl } from '../../utils/publicPath';

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface FetchProductsConfig {
  rejectValue: string;
}

const normalizeNewestProducts = (products: Product[]): Product[] => {
  const newestYear = Math.max(...products.map(product => product.year ?? 0));

  return products.map(product => {
    const isNewest = product.year === newestYear;

    if (
      !isNewest ||
      product.fullPrice === undefined ||
      product.fullPrice <= product.price
    ) {
      return product;
    }

    const { fullPrice, ...productWithoutFullPrice } = product;

    return {
      ...productWithoutFullPrice,
      price: fullPrice,
    };
  });
};

/* eslint-disable @typescript-eslint/indent */
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  FetchProductsConfig
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  /* eslint-enable @typescript-eslint/indent */
  try {
    const response = await fetch(getPublicUrl('api/products.json'));

    if (!response.ok) {
      return rejectWithValue('Failed to fetch products');
    }

    const data = (await response.json()) as Product[];

    return normalizeNewestProducts(data);
  } catch (err) {
    return rejectWithValue('Network error');
  }
});

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? action.error.message ?? 'Error';
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) =>
  state.products.isLoading;
export const selectProductsError = (state: RootState) => state.products.error;

export default productsSlice.reducer;
