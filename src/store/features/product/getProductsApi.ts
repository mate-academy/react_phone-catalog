import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { TProduct } from '@utils/types/product.type';

export const getProducts = createAsyncThunk<TProduct[]>(
  'api/getProducts',
  async () => {
    const { data } = await axios.get<TProduct[]>('api/products.json');

    return data;
  },
);
