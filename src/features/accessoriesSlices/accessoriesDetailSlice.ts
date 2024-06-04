import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { IAccessoriesDetail } from '../../types';
import { BASE_URL } from '../../helper';

type AccessoriesDetail = {
  accessories: IAccessoriesDetail | null;
  status: 'loading' | 'succeeded' | 'error';
  error: string | null;
};

const initialState: AccessoriesDetail = {
  accessories: null,
  status: 'loading',
  error: null,
};

export const fetchAccessoriesDetail
  = createAsyncThunk<IAccessoriesDetail, string>(
    'accessoriesDetail/fetchAccessoriesDetail',
    async (id: string, { rejectWithValue }) => {
      try {
        const res = await axios.get<IAccessoriesDetail[]>(`${BASE_URL}/accessories.json`);

        const accessories = res.data.find((el) => el.id === id);

        if (!accessories) {
          return rejectWithValue(`Accessories with id ${id} not found`);
        }

        return accessories;
      } catch (error) {
        throw new Error();
      }
    },
  );

const accessoriesDetailSlice = createSlice({
  name: 'accessoriesDetail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAccessoriesDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccessoriesDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessories = action.payload;
      })
      .addCase(fetchAccessoriesDetail.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const selectAccessoriesDetail
  = (state: RootState) => state.accessoriesDetail.accessories;
export const selectAccessoriesDetailStatus
  = (state: RootState) => state.accessoriesDetail.status;
export const selectAccessoriesDetailError
  = (state: RootState) => state.accessoriesDetail.error;

export default accessoriesDetailSlice.reducer;
