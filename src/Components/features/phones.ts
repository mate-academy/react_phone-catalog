/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductWithYear } from '../../types/product';
import { ProductInfo } from '../../types/productInfo';

type PhonesState = {
  phones: ProductWithYear[] | null;
  loading: boolean;
  error: string | null;
};

const initialState: PhonesState = {
  phones: null,
  loading: false,
  error: null,
};

export const fetchPhonesWithYear = createAsyncThunk<ProductWithYear[]>(
  'phones/fetchPhonesWithYear',
  async () => {
    const [phonesResponse, productsResponse] = await Promise.all([
      fetch('/react_phone-catalog/api/phones.json'),
      fetch('/react_phone-catalog/api/products.json'),
    ]);

    if (!phonesResponse.ok) {
      throw new Error('Failed to fetch phones');
    }

    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products');
    }

    const phonesData: Product[] = await phonesResponse.json();
    const productsData: ProductInfo[] = await productsResponse.json();

    const mergedPhones = phonesData.map(phone => {
      const productInfo = productsData.find(
        product => product.itemId === phone.id,
      );

      return {
        ...phone,
        year: productInfo ? productInfo.year : 0,
      };
    });

    return mergedPhones;
  },
);

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhonesWithYear.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPhonesWithYear.fulfilled,
        (state, action: PayloadAction<ProductWithYear[]>) => {
          state.loading = false;
          state.phones = action.payload;
        },
      )
      .addCase(fetchPhonesWithYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
