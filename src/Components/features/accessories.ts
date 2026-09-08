/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductWithYear } from '../../types/product';
import { ProductInfo } from '../../types/productInfo';

type AccessoriesSlice = {
  accessories: ProductWithYear[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: AccessoriesSlice = {
  accessories: null,
  loading: false,
  error: null,
};

export const fetchAccessoriesWithYear = createAsyncThunk<ProductWithYear[]>(
  'accessories/fetchAccessoriesWithYear',
  async () => {
    const [accessoriesResponse, productsResponse] = await Promise.all([
      fetch('/react_phone-catalog/api/accessories.json'),
      fetch('/react_phone-catalog/api/products.json'),
    ]);

    if (!accessoriesResponse.ok) {
      throw new Error('Failed to fetch accessories');
    }

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const accessoriesData: Product[] = await accessoriesResponse.json();
    const productsData: ProductInfo[] = await productsResponse.json();

    const mergedAccessories = accessoriesData.map(tablet => {
      const productInfo = productsData.find(
        product => product.itemId === tablet.id,
      );

      return {
        ...tablet,
        year: productInfo ? productInfo.year : 0,
      };
    });

    return mergedAccessories;
  },
);

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAccessoriesWithYear.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAccessoriesWithYear.fulfilled,
        (state, action: PayloadAction<ProductWithYear[]>) => {
          state.loading = false;
          state.accessories = action.payload;
        },
      )
      .addCase(fetchAccessoriesWithYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
