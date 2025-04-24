/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TabletType } from '../../types/Product';

export const setTablets = createAsyncThunk('phones/setTablets', async () => {
  const res = await fetch('../../react_phone-catalog/api/tablets.json');

  return res.json();
});

const initialState = {
  listOfTablets: [] as TabletType[],
  loaded: true,
};

export const tabletsSlice = createSlice({
  name: 'tablets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setTablets.fulfilled, (state, action) => {
      state.listOfTablets = action.payload;
    });
  },
});

export default tabletsSlice.reducer;
