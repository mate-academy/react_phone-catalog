/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getPhones } from './getPhoneApi';

import { PhoneState } from '@utils/types/rootState.type';

const initialState: PhoneState = {
  phones: [],
  loading: false,
  error: '',
};

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPhones.pending, state => {
        state.loading = true;
      })
      .addCase(getPhones.fulfilled, (state, { payload }) => {
        state.phones = payload;
        state.loading = false;
      })
      .addCase(getPhones.rejected, (state, actions) => {
        state.phones = [];
        state.error = actions.error.message;
        state.loading = false;
      });
  },
});

export default phonesSlice.reducer;

export const { actions } = phonesSlice;
