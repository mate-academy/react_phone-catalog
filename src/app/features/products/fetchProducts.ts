import { createAsyncThunk } from '@reduxjs/toolkit';

import { delay } from '../../../helpers/delay';
import { Product } from '../../../types';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetch',
  async () => {
    await delay(1000);

    const response = await fetch('api/products.json');

    if (response.ok) {
      return (await response.json()) as Product[];
    }

    throw new Error(response.statusText);
  },
);
