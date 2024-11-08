import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { TProductBase } from '@utils/types/productBase.type';

export const getPhones = createAsyncThunk<TProductBase[]>(
  'api/getPhones',
  async () => {
    const { data } = await axios.get<TProductBase[]>('api/phones.json');

    return data;
  },
);
