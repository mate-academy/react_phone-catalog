import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { TProductBase } from '@utils/types/productBase.type';

export const getTablets = createAsyncThunk<TProductBase[]>(
  'api/getTablets',
  async () => {
    const { data } = await axios.get<TProductBase[]>('api/tablets.json');

    return data;
  },
);
