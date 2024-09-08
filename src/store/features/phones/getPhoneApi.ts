import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getApi = '/api/phones.json';

export const getPhones = createAsyncThunk('api/getPhones', async () => {
  const response = await axios.get(getApi);

  return response.data;
});
