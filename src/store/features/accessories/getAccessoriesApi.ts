import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAccessories = createAsyncThunk(
  'api/getAccessories',
  async () => {
    const response = await axios.get('api/accessories.json');

    return response.data;
  },
);
