/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { QueryResponse, Phone } from '../../../../types';
import { fetchPhones } from './fetchPhones';

type State = QueryResponse<{
  phones: Phone[];
}>;

const initialState: State = {
  error: '',
  phones: [],
  status: 'idle',
};

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhones.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(fetchPhones.rejected, (state, { error: { message } }) => {
        state.status = 'rejected';
        state.error = message || 'An error occured while fetching phones';
      })
      .addCase(fetchPhones.fulfilled, (state, { payload }) => {
        state.phones = payload;
        state.status = 'fulfilled';
      });
  },
});
