import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getApi = '/api/tablets.json';

export const getTablets = createAsyncThunk('api/getTablets', async () => {
  const response = await axios.get(getApi);

  return response.data;
});
