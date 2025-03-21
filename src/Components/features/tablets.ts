/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductWithYear } from '../../types/product';
import { ProductInfo } from '../../types/productInfo';

type TabletsSlice = {
  tablets: ProductWithYear[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: TabletsSlice = {
  tablets: null,
  loading: false,
  error: null,
};

export const fetchTabletsWithYear = createAsyncThunk<ProductWithYear[]>(
  'tablets/fetchTabletsWithYear',
  async () => {
    const [tabletsResponse, productsResponse] = await Promise.all([
      fetch('/react_phone-catalog/api/tablets.json'),
      fetch('/react_phone-catalog/api/products.json'),
    ]);

    if (!tabletsResponse.ok) {
      throw new Error('Failed to fetch tablets');
    }

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const tabletsData: Product[] = await tabletsResponse.json();
    const productsData: ProductInfo[] = await productsResponse.json();

    const mergedTablets = tabletsData.map(tablet => {
      const productInfo = productsData.find(
        product => product.itemId === tablet.id,
      );

      return {
        ...tablet,
        year: productInfo ? productInfo.year : 0,
      };
    });

    return mergedTablets;
  },
);

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTabletsWithYear.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTabletsWithYear.fulfilled,
        (state, action: PayloadAction<ProductWithYear[]>) => {
          state.loading = false;
          state.tablets = action.payload;
        },
      )
      .addCase(fetchTabletsWithYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
