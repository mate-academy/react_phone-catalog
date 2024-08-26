/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, Product } from '../../../../entities/Product';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';

export const fetchHotProducts = createAsyncThunk<
  Product[],
  void,
  ThunkConfig<boolean>
>('homePage/fetchHotProducts', async (_, ThuncApi) => {
  const { rejectWithValue } = ThuncApi;

  try {
    const products = await fetchProducts();

    if (typeof products === 'string') {
      return rejectWithValue(false);
    } else {
      return products
        .filter(product => product.fullPrice !== product.price)
        .sort((a, b) => b.fullPrice - a.fullPrice);
    }
  } catch (e) {
    return rejectWithValue(false);
  }
});
