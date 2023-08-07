/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PhoneDetails } from '../../types/PhoneDetails';
import { getPhoneDetails, getProductDetails } from '../../api/phone';
import { AsyncStatus } from '../../types/AsyncStatus';
import { KeyJson } from '../../types/KeyJson';
import { phoneDetailsSameType } from '../../app/helpers';

export interface PhonesState {
  value: PhoneDetails | null,
  status: AsyncStatus,
}
const localeStorage = window.localStorage.getItem(KeyJson.DETAILS);

const initialState: PhonesState = {
  value: localeStorage
    ? JSON.parse(localeStorage)
    : null,
  status: AsyncStatus.IDLE,
};

export const incrementAsync = createAsyncThunk(
  'phoneDetails/fetchPhones',
  async (phoneId: string) => {
    const phoneDetails = await getPhoneDetails(phoneId);

    return phoneDetails;
  },
);

export const incrementAsyncOld = createAsyncThunk(
  'phoneDetails/fetchPhonesOld',
  async (phoneId: string) => {
    const phoneDetails = await getProductDetails(phoneId);

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
      })
      .addCase(incrementAsyncOld.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(incrementAsyncOld.fulfilled, (state, action) => {
        state.status = AsyncStatus.IDLE;
        state.value = phoneDetailsSameType(action.payload);
      })
      .addCase(incrementAsyncOld.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { reducer, actions } = phoneDetaildSlice;
