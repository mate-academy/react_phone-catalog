/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PhoneType } from '../../types/Product';

export const setPhones = createAsyncThunk('phones/setPhones', async () => {
  const res = await fetch('../../public/api/phones.json');

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
    // builder.addCase(setProducts.pending, state => {
    //   state.hasError = false;
    //   state.loaded = false;
    // });
    builder.addCase(setPhones.fulfilled, (state, action) => {
      state.listOfPhones = action.payload;
    });
    // builder.addCase(setProducts.rejected, state => {
    //   state.loaded = true;
    //   state.hasError = true;
    // });
  },
});

export default phonesSlice.reducer;
