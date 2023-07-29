/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PhoneDetails } from '../../types/PhoneDetails';
import { getPhoneDetails } from '../../api/phone';
import { AsyncStatus } from '../../types/AsyncStatus';

export interface PhonesState {
  value: PhoneDetails | null,
  status: AsyncStatus,
}

const initialState: PhonesState = {
  value: null,
  status: AsyncStatus.IDLE,
};

export const incrementAsync = createAsyncThunk(
  'phones/fetchPhones',
  async (phoneId: string) => {
    const phoneDetails = await getPhoneDetails(phoneId);

    return phoneDetails;
  },
);

const phoneDetaildSlice = createSlice({
  name: 'phoneDetails',
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

export const { reducer, actions } = phoneDetaildSlice;
