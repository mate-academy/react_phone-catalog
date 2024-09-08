import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPhones = createAsyncThunk('api/getPhones', async () => {
  const response = await axios.get('/public/api/phones.json');

  return response.data;
});
