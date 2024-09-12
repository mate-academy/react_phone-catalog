import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTablets = createAsyncThunk('api/getTablets', async () => {
  const response = await axios.get('api/tablets.json');

  return response.data;
});
