/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phone } from '../../types/Phone';
import { getPhones } from '../../utils/fetchClient';

type State = {
  phones: Phone[],
  isLoading: boolean,
  isError: boolean,
};

const initialState: State = {
  phones: [],
  isLoading: false,
  isError: false,
};

export const fetchAllPhones = createAsyncThunk('phones/fetchPhones', getPhones);

export const allPhones = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllPhones.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchAllPhones.fulfilled, (state, action) => {
        state.phones = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllPhones.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default allPhones.reducer;
