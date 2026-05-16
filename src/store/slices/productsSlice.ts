/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/products';

type ProductsType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  productsLength: number;
  productsHotPrices: Product[];
  productsNewModels: Product[];
};

const initialState: ProductsType = {
  products: [],
  loading: false,
  error: null,
  productsLength: 0,
  productsHotPrices: [],
  productsNewModels: [],
};

const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const response = await fetch('./api/products.json');
  const data: Product[] = await response.json();

  return data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
          state.productsLength = action.payload.length;
          state.productsHotPrices = action.payload.sort(
            (a, b) => b.fullPrice - a.fullPrice,
          );
          state.productsNewModels = action.payload.sort((a, b) => {
            return b.year - a.year;
          });
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;
export { fetchProducts };
export type RootState = {
  products: ProductsType;
};
