import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import { ITabletDetail } from '../../types';
import { BASE_URL } from '../../helper';

type TabletsDetail = {
  tablets: ITabletDetail | null;
  status: 'loading' | 'succeeded' | 'error';
  error: string | null;
};

const initialState: TabletsDetail = {
  tablets: null,
  status: 'loading',
  error: null,
};

export const fetchTabletsDetail
  = createAsyncThunk<ITabletDetail, string>(
    'tabletsDetail/fetchTabletsDetail',
    async (id: string, { rejectWithValue }) => {
      try {
        const res = await axios.get<ITabletDetail[]>(`${BASE_URL}/tablets.json`);

        const tablets = res.data.find((el) => el.id === id);

        if (!tablets) {
          return rejectWithValue(`Tablets with id ${id} not found`);
        }

        return tablets;
      } catch (error) {
        throw new Error();
      }
    },
  );

const tabletDetailSlice = createSlice({
  name: 'tabletDetail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTabletsDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTabletsDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tablets = action.payload;
      })
      .addCase(fetchTabletsDetail.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const selectTabletDetail
  = (state: RootState) => state.tabletDetail.tablets;
export const selectTabletDetailStatus
  = (state: RootState) => state.tabletDetail.status;
export const selectTabletDetailError
  = (state: RootState) => state.tabletDetail.error;

export default tabletDetailSlice.reducer;
