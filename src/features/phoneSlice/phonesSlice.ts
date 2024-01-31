import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPhone } from '../../types/Phone.interface';
import { BASE_URL } from '../../helper/BASE_URL';
import type { RootState } from '../../app/store';

type Phones = {
  phones: IPhone[],
  status: 'loading' | 'succeeded' | 'error',
  error: string | null;
};

const initialState: Phones = {
  phones: [],
  status: 'loading',
  error: null,
};

export const fetchPhones = createAsyncThunk<IPhone[]>(
  'phones/fetchPhones',
  async () => {
    const respone = await axios.get<IPhone[]>(`${BASE_URL}/products.json`);

    return respone.data;
  },
);

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    searchByTitle(state, action: PayloadAction<IPhone[]>) {
      state.phones = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPhones.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.phones = action.payload;
      })
      .addCase(fetchPhones.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const selectPhones = (state: RootState) => state.phones.phones;
export const selectPhonesStatus = (state: RootState) => state.phones.status;

export const { searchByTitle } = phoneSlice.actions;

export default phoneSlice.reducer;
