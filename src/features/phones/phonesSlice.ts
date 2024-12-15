/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PhoneType } from '../../types/Product';

export const setPhones = createAsyncThunk('phones/setPhones', async () => {
  const res = await fetch('../../api/phones.json');

  return res.json();
});

const initialState = {
  listOfPhones: [] as PhoneType[],
};

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setPhones.fulfilled, (state, action) => {
      state.listOfPhones = action.payload;
    });
  },
});

export default phonesSlice.reducer;
