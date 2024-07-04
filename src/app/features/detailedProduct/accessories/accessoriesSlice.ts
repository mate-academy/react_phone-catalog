/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { QueryResponse, Accessory } from '../../../../types';
import { fetchAccessories } from './fetchAccessories';

type State = QueryResponse<{
  accessories: Accessory[];
}>;

const initialState: State = {
  error: '',
  accessories: [],
  status: 'idle',
};

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAccessories.pending, state => {
        state.status = 'pending';
        state.error = '';
      })
      .addCase(fetchAccessories.rejected, (state, { error: { message } }) => {
        state.status = 'rejected';
        state.error = message || 'An error occured while fetching phones';
      })
      .addCase(fetchAccessories.fulfilled, (state, { payload }) => {
        state.accessories = payload;
        state.status = 'fulfilled';
      });
  },
});
