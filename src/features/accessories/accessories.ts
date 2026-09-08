/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AccessoryType } from '../../types/Product';

export const setAccessories = createAsyncThunk(
  'phones/setAccessories',
  async () => {
    const res = await fetch('../../react_phone-catalog/api/accessories.json');

    return res.json();
  },
);

const initialState = {
  listOfAccessories: [] as AccessoryType[],
};

export const accessoriesSlice = createSlice({
  name: 'accessories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setAccessories.fulfilled, (state, action) => {
      state.listOfAccessories = action.payload;
    });
  },
});

export default accessoriesSlice.reducer;
