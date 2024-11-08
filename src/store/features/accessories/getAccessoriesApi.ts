import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { TProductBase } from '@utils/types/productBase.type';

export const getAccessories = createAsyncThunk<TProductBase[]>(
  'api/getAccessories',
  async () => {
    const { data } = await axios.get<TProductBase[]>('api/accessories.json');

    return data;
  },
);
