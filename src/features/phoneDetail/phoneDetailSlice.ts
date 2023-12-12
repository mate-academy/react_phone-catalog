import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Phone } from '../../types/Phone';
import type { RootState } from '../../app/store';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const fetchPhoneDetail = createAsyncThunk<Phone, string>(
  'phoneDetail/fetchPhoneDetail',
  async (id: string) => {
    const res = await axios.get<Phone>(`${BASE_URL}/products.json/${id}`);

    return res.data;
  },
);

type PhoneDetail = {
  phone: Phone | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: PhoneDetail = {
  phone: null,
  status: 'idle',
  error: null,
};

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
        console.log(state.phone);
        state.phone = action.payload;
        console.log(state.phone);
      })
      .addCase(fetchPhoneDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectPhone = (state: RootState) => state.phoneDetail.phone;
export const selectStatus = (state: RootState) => state.phoneDetail.status;

export default phoneDetailSlice.reducer;
