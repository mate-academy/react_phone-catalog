import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IPhoneDetail } from '../../types';
import { BASE_URL } from '../../helper';
// import { IPhone } from '../../types';

type PhoneDetail = {
  phone: IPhoneDetail | null;
  status: 'loading' | 'succeeded' | 'error';
  error: string | null;
};

const initialState: PhoneDetail = {
  phone: null,
  status: 'loading',
  error: null,
};

export const fetchPhoneDetail = createAsyncThunk<IPhoneDetail, string>(
  'phoneDetail/fetchPhoneDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get<IPhoneDetail[]>(`${BASE_URL}/phones.json`);

      const phone = res.data.find((el) => el.id === id);

      if (!phone) {
        return rejectWithValue(`Phone with id ${id} not found`);
      }

      return phone;
    } catch (error) {
      throw new Error();
    }
  },
);

const phoneDetailSlice = createSlice({
  name: 'phoneDetail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPhoneDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhoneDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.phone = action.payload;
      })
      .addCase(fetchPhoneDetail.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const selectPhoneDetail = (state: RootState) => state.phoneDetail.phone;
export const selectPhoneDetailStatus
  = (state: RootState) => state.phoneDetail.status;
export const selectPhoneDetailError
  = (state: RootState) => state.phoneDetail.error;

export default phoneDetailSlice.reducer;
