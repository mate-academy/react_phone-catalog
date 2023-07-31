/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getPhones } from '../../api/phone';
import { AsyncStatus } from '../../types/AsyncStatus';

export interface PhonesState {
  value: Product[],
  status: AsyncStatus,
}

const initialState: PhonesState = {
  value: [],
  status: AsyncStatus.IDLE,
};

export const incrementAsync = createAsyncThunk(
  'phones/fetchPhones',
  async () => {
    const phones = await getPhones();

    return phones;
  },
);

const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { reducer, actions } = phonesSlice;
