/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TabletType } from '../../types/Product';

export const setTablets = createAsyncThunk('phones/setTablets', async () => {
  const res = await fetch('../../public/api/tablets.json');

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
    // builder.addCase(setTablets.pending, state => {
    //   // state.hasError = false;
    //   state.loaded = false;
    // });
    builder.addCase(setTablets.fulfilled, (state, action) => {
      state.listOfTablets = action.payload;
    });
    // builder.addCase(setProducts.rejected, state => {
    //   state.loaded = true;
    //   state.hasError = true;
    // });
  },
});

export default tabletsSlice.reducer;
