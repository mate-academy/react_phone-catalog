import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('api/getProducts', async () => {
  const response = await axios.get('/public/api/products.json');

  return response.data;
});
