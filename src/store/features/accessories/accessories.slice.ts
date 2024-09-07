/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { getAccessories } from './getAccessoriesApi';
import { TAccessories } from 'utils/types/accessories.type';

type PhoneState = {
  accessories: TAccessories[];
  loading: boolean;
  error: string | undefined;
};

const initialState: PhoneState = {
  accessories: [],
  loading: false,
  error: '',
};

const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState: initialState,
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
