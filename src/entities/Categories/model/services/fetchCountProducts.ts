/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../../../entities/Product';
import { ThunkConfig } from '../../../../app/providers/StoreProvider';
import { ICountProducts } from '../types/categoriesSchema';

export const fetchCountProducts = createAsyncThunk<
  ICountProducts,
  void,
  ThunkConfig<boolean>
>('categories/fetchCountProducts', async (_, ThuncApi) => {
  const { rejectWithValue } = ThuncApi;

  try {
    const products = await fetchProducts();

    if (typeof products === 'string') {
      return rejectWithValue(false);
    } else {
      const result: ICountProducts = {
        phones: products.filter(product => product.category === 'phones')
          .length,
        tablets: products.filter(product => product.category === 'tablets')
          .length,
        accessories: products.filter(
          product => product.category === 'accessories',
        ).length,
      };

      return result;
    }
  } catch (e) {
    return rejectWithValue(false);
  }
});
