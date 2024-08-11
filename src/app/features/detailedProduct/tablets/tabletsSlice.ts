/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { QueryResponse, Tablet } from '../../../../types';
import { fetchTablets } from './fetchTablets';

type State = QueryResponse<{
  tablets: Tablet[];
}>;

const initialState: State = {
  error: '',
  tablets: [],
  status: 'idle',
};

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTablets.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(fetchTablets.rejected, (state, { error: { message } }) => {
        state.status = 'rejected';
        state.error = message || 'An error occured while fetching phones';
      })
      .addCase(fetchTablets.fulfilled, (state, { payload }) => {
        state.tablets = payload;
        state.status = 'fulfilled';
      });
  },
});
