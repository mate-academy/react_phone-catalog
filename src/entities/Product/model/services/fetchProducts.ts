/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';
import { Product } from '../types/product';

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  ThunkConfig<boolean>
>('products/fetchProduct', async (_, ThunkApi) => {
  const { rejectWithValue, getState } = ThunkApi;

  const products = getState().products.products;

  try {
    if (!products.length) {
      const response = await fetch(
        'http://localhost:3000/api/products.json',
      ).then(res => res.json());

      return response;
    } else {
      return products;
    }
  } catch (e) {
    return rejectWithValue(false);
  }
});
