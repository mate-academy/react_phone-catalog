/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getTablets } from './getTabletsApi';
import { TabletState } from '@utils/types/rootState.type';

const initialState: TabletState = {
  tablets: [],
  loading: false,
  error: '',
};

const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTablets.pending, state => {
        state.loading = true;
      })
      .addCase(getTablets.fulfilled, (state, { payload }) => {
        state.tablets = payload;
        state.loading = false;
      })
      .addCase(getTablets.rejected, (state, actions) => {
        state.tablets = [];
        state.error = actions.error.message;
        state.loading = false;
      });
  },
});

export default tabletsSlice.reducer;

export const { actions } = tabletsSlice;
