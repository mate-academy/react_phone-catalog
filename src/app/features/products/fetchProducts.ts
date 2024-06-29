import { createAsyncThunk } from '@reduxjs/toolkit';

import { delay } from '../../../utils/delay';
import { Product } from '../../../types';
import { AppState } from '../../store';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetch',
  async (_arg, api) => {
    await delay(300);

    const response = await fetch('api/products.json', {
      signal: api.signal,
    });

    if (response.ok) {
      return (await response.json()) as Product[];
    }

    throw new Error(response.statusText);
  },
  {
    condition(_a, api) {
      return (api.getState() as AppState).products.status !== 'pending';
    },
  },
);
