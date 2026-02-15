import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types';
import { getTablets } from '../utils/api';

export interface TabletsState {
  tablets: Product[];
}

const initialState: TabletsState = {
  tablets: JSON.parse(localStorage.getItem('tablets') || '[]'),
};

export const setTabletsAsync = createAsyncThunk('tablets/fetch', async () => {
  const data = await getTablets();

  localStorage.setItem('tablets', JSON.stringify(data));

  return data;
});

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setTabletsAsync.fulfilled, (state, action) => {
      return {
        ...state,
        tablets: action.payload,
      };
    });
  },
});

export const {} = tabletsSlice.actions;
export default tabletsSlice.reducer;
