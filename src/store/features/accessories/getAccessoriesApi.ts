import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getApi = '/api/accessories.json';

export const getAccessories = createAsyncThunk(
  'api/getAccessories',
  async () => {
    const response = await axios.get(getApi);

    return response.data;
  },
);
