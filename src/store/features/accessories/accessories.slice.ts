/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getAccessories } from './getAccessoriesApi';

import { AccessoriesState } from '@utils/types/rootState.type';

const initialState: AccessoriesState = {
  accessories: [],
  loading: false,
  error: '',
};

const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAccessories.pending, state => {
        state.loading = true;
      })
      .addCase(getAccessories.fulfilled, (state, { payload }) => {
        state.accessories = payload;
        state.loading = false;
      })
      .addCase(getAccessories.rejected, (state, actions) => {
        state.accessories = [];
        state.error = actions.error.message;
        state.loading = false;
      });
  },
});

export default accessoriesSlice.reducer;

export const { actions } = accessoriesSlice;
