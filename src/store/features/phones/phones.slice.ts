/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getPhones } from './getPhoneApi';

import { TProductBase } from 'utils/types/productBase.type';

type PhoneState = {
  phones: TProductBase[];
  loading: boolean;
  error: string | undefined;
};

const initialState: PhoneState = {
  phones: [],
  loading: false,
  error: '',
};

const phonesSlice = createSlice({
  name: 'phones',
  initialState: initialState,
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
