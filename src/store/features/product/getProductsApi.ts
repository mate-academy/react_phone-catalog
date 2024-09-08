import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getApi = '/api/products.json';

export const getProducts = createAsyncThunk('api/getProducts', async () => {
  const response = await axios.get(getApi);

  return response.data;
});
